from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
import numpy as np
import cv2
from PIL import Image
import io
from src.models import UnetVFLOW
import argparse
from typing import List, Optional
import uvicorn
import sys
import os
import pandas as pd
from pathlib import Path
import ee
import geemap
from datetime import datetime
from dateutil.relativedelta import relativedelta
import tempfile
import shutil
import base64
import requests
import rasterio

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

app = FastAPI(
    title="Biomass Prediction API",
    description="API for predicting biomass using satellite imagery",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Earth Engine
try:
    ee.Initialize(project='fyp-alimurad3422')
except Exception as e:
    print(f"Error initializing Earth Engine: {str(e)}")
    print("Please authenticate Earth Engine first using: earthengine authenticate")

# Function to download Sentinel imagery
def get_sentinel_images(coordinates, output_dir):
    roi = ee.Geometry.Polygon(coordinates)
    os.makedirs(output_dir, exist_ok=True)
    start_date = datetime(2023, 1, 1)
    metadata_data = []

    def export_image(image, filename):
        try:
            geemap.ee_export_image(
                image,
                filename=filename,
                scale=10,
                region=roi,
                file_per_band=False
            )
            return True
        except Exception as e:
            print(f"Error exporting {filename}: {str(e)}")
            return False

    for i in range(12):
        month_start_dt = start_date + relativedelta(months=i)
        month_end_dt = month_start_dt + relativedelta(months=1)
        month_start = ee.Date(month_start_dt.strftime("%Y-%m-%d"))
        month_end = ee.Date(month_end_dt.strftime("%Y-%m-%d"))
        month_num = f"{i+1:02d}"

        s2_collection = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED") \
            .filterBounds(roi) \
            .filterDate(month_start, month_end) \
            .select(["B2", "B3", "B4", "B5", "B6", "B7", "B8", "B8A", "B11", "B12"])

        s1_collection = ee.ImageCollection("COPERNICUS/S1_GRD") \
            .filterBounds(roi) \
            .filterDate(month_start, month_end) \
            .filter(ee.Filter.eq('instrumentMode', 'IW')) \
            .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV")) \
            .select("VV")

        s2_median = s2_collection.median()
        s1_median = s1_collection.median()

        s2_filename = os.path.join(output_dir, f"{month_num}_s2.tif")
        s1_filename = os.path.join(output_dir, f"{month_num}_s1.tif")

        s2_success = export_image(s2_median, s2_filename)
        s1_success = export_image(s1_median, s1_filename)

        if s2_success and s1_success:
            metadata_data.append({
                'chip_id': f"{month_num}",
                'year': month_start_dt.year,
                'month': month_start_dt.month,
                's2_path': s2_filename,
                's1_path': s1_filename,
                'split': 'test'
            })

    metadata_df = pd.DataFrame(metadata_data)
    metadata_path = os.path.join(output_dir, "features_metadata.csv")
    metadata_df.to_csv(metadata_path, index=False)

    return metadata_path, output_dir

# Helper to calculate metrics
def calculate_metrics(preds):
    gt = np.ones_like(preds)
    mae = np.mean(np.abs(preds - gt))
    rmse = np.sqrt(np.mean((preds - gt) ** 2))
    return {"MAE": mae, "RMSE": rmse}

# Function to read the TIFF image
def read_tiff_image(file_path):
    try:
        with rasterio.open(file_path) as src:
            image = src.read()
            # Transpose to (height, width, channels)
            image = np.transpose(image, (1, 2, 0))
            return image
    except Exception as e:
        print(f"Error reading {file_path}: {str(e)}")
        return None

# Load the pre-trained model
def load_model():
    args = argparse.Namespace(
        backbone="efficientnet_b0",
        in_channels=15,
        out_indices=[0, 1, 2, 3, 4],
        dec_channels=[256, 128, 64, 32, 16],
        dec_attn_type="scse",
        n_classes=1
    )
    model = UnetVFLOW(args)
    try:
        state_dict = torch.load("models~1/Model_veg_indices/tf_efficientnetv2_xl_in21k_f0_b2x1_e50_nrmse_devscse_attnlin_augs_decplus7_plus800eb_200ft/modelo_best.pth", map_location=torch.device('cpu'))
        new_state_dict = {k.replace('module.', ''): v for k, v in state_dict.items()}
        model.load_state_dict(new_state_dict, strict=False)
        print("Model loaded successfully with strict=False")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
    model.eval()
    return model

model = load_model()

# Function to split image into patches
def split_into_patches(image, patch_size=256):
    h, w, c = image.shape
    patches = []
    positions = []  # Store the position of each patch
    
    # For small images, pad to patch_size
    if h < patch_size or w < patch_size:
        # Create a zero-padded image of size patch_size x patch_size
        padded_image = np.zeros((patch_size, patch_size, c), dtype=image.dtype)
        # Place the original image in the top-left corner
        padded_image[:h, :w, :] = image
        patches.append(padded_image)
        positions.append((0, 0))
        print(f"Padded small image from {image.shape} to {padded_image.shape}")
        return patches, positions
    
    # For larger images, proceed with normal patch extraction
    for y in range(0, h, patch_size):
        for x in range(0, w, patch_size):
            if y + patch_size <= h and x + patch_size <= w:
                patch = image[y:y + patch_size, x:x + patch_size]
                patches.append(patch)
                positions.append((y, x))
    
    print(f"Generated {len(patches)} patches from image of shape {image.shape}")
    return patches, positions

@app.post("/predict")
async def predict_biomass(
    coordinates: dict,
    batch_size: int = Query(16, description="Batch size for prediction"),
    tta: int = Query(4, description="Number of test-time augmentations")
):
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            metadata_path, images_dir = get_sentinel_images(coordinates['coordinates'], temp_dir)

            df = pd.read_csv(metadata_path)
            test_df = df[df.split == "test"].copy()

            monthly_patches = {}
            patch_positions = None
            original_shape = None

            for _, row in test_df.iterrows():
                chip_id = row['chip_id']
                print(f"Processing chip_id: {chip_id}")

                s2_img = read_tiff_image(row['s2_path'])
                s1_img = read_tiff_image(row['s1_path'])

                if s2_img is None or s1_img is None:
                    print(f"Error loading images for chip_id {chip_id}")
                    continue

                if original_shape is None:
                    original_shape = s2_img.shape[:2]

                # Ensure S2 has 14 channels
                if s2_img.shape[2] > 14:
                    s2_img = s2_img[:, :, :14]
                elif s2_img.shape[2] < 14:
                    padded_s2 = np.zeros((s2_img.shape[0], s2_img.shape[1], 14), dtype=s2_img.dtype)
                    padded_s2[:, :, :s2_img.shape[2]] = s2_img
                    s2_img = padded_s2

                # Ensure S1 has 1 channel
                if len(s1_img.shape) == 2:
                    s1_img = np.expand_dims(s1_img, axis=2)
                elif s1_img.shape[2] > 1:
                    s1_img = s1_img[:, :, :1]

                s2_img = s2_img.astype(np.float32) / 255.0
                s1_img = s1_img.astype(np.float32) / 255.0

                if s2_img.shape[:2] != s1_img.shape[:2]:
                    print(f"Shape mismatch for {chip_id}, skipping")
                    continue

                print(f"Processing images for {chip_id} with shapes: S2: {s2_img.shape}, S1: {s1_img.shape}")

                s2_patches, positions = split_into_patches(s2_img)
                s1_patches, _ = split_into_patches(s1_img)
                
                if patch_positions is None:
                    patch_positions = positions

                if len(s2_patches) != len(s1_patches):
                    print(f"Patch count mismatch for {chip_id}, skipping")
                    continue

                combined = []
                for s2, s1 in zip(s2_patches, s1_patches):
                    if s2.shape[2] != 14:
                        print(f"Warning: S2 patch has {s2.shape[2]} channels instead of 14")
                        continue
                    if s1.shape[2] != 1:
                        print(f"Warning: S1 patch has {s1.shape[2]} channels instead of 1")
                        continue
                    
                    combined_patch = np.concatenate([s2, s1], axis=2)
                    print(f"Combined patch shape: {combined_patch.shape}")
                    combined.append(combined_patch)

                monthly_patches[chip_id] = combined

            months = sorted(monthly_patches.keys())
            print(f"Found {len(months)} months: {months}")

            if len(months) != 12:
                raise ValueError(f"Incomplete data. Found only {len(months)} months.")

            patch_counts = [len(patches) for patches in monthly_patches.values()]
            print(f"Patch counts across months: {patch_counts}")

            if not all(p == patch_counts[0] for p in patch_counts):
                raise ValueError("Mismatch in number of patches across months.")

            num_patches = patch_counts[0]
            temporal_stack = []

            for patch_idx in range(num_patches):
                months_stack = []
                try:
                    for month in months:
                        patch = monthly_patches[month][patch_idx]
                        print(f"Processing patch {patch_idx} from month {month} with shape {patch.shape}")
                        if patch.shape[2] != 15:
                            print(f"Skipping patch {patch_idx} from {month}: expected 15 channels, got {patch.shape[2]}")
                            continue
                        tensor_patch = torch.from_numpy(patch).permute(2, 0, 1)
                        months_stack.append(tensor_patch)

                    if len(months_stack) == 12:
                        patch_tensor = torch.stack(months_stack)  # [12, 15, 256, 256]
                        temporal_stack.append(patch_tensor)
                    else:
                        print(f"Skipping patch {patch_idx}: incomplete monthly stack")

                except Exception as ex:
                    print(f"Skipping patch {patch_idx}: {str(ex)}")

            if not temporal_stack:
                raise ValueError("No valid patches to predict.")

            # Process patches in batches
            all_predictions = []
            
            for i in range(0, len(temporal_stack), batch_size):
                batch = temporal_stack[i:i + batch_size]
                input_tensor = torch.stack(batch)  # [batch_size, 12, 15, 256, 256]
                mask = torch.zeros((input_tensor.shape[0], 12), dtype=torch.bool)

                with torch.no_grad():
                    predictions = model(input_tensor, mask)
                
                predictions_np = predictions.cpu().numpy()
                print(f"Model output shape: {predictions_np.shape}")
                
                # Reshape predictions to match input image shape
                h, w = original_shape
                if len(predictions_np.shape) == 4:  # [batch_size, channels, height, width]
                    predictions_np = predictions_np.squeeze(1)  # Remove channel dimension
                
                # Resize predictions to match original image size
                resized_predictions = []
                for pred in predictions_np:
                    resized_pred = cv2.resize(pred, (w, h), interpolation=cv2.INTER_LINEAR)
                    resized_predictions.append(resized_pred)
                
                all_predictions.extend(resized_predictions)

            # Create final biomass map
            reconstructed_map = np.zeros(original_shape)
            
            for idx, (y, x) in enumerate(patch_positions):
                if idx < len(all_predictions):
                    patch_map = all_predictions[idx]
                    
                    # For small images, use the entire resized prediction
                    if h < 256 or w < 256:
                        reconstructed_map = patch_map
                    else:
                        reconstructed_map[y:y+256, x:x+256] = patch_map

            # Calculate average biomass value
            average_biomass = float(np.mean(reconstructed_map))

            # Save rasterized map as PNG
            # output_path = os.path.join(temp_dir, "biomass_map.png")
            output_path = os.path.join('/', "biomass_map.png")
            print(f"Saving output to:  {output_path}")
            # Normalize the map to 0-255 range for visualization
            normalized_map = ((reconstructed_map - reconstructed_map.min()) / 
                            (reconstructed_map.max() - reconstructed_map.min()) * 255).astype(np.uint8)
            
            # Apply a colormap for better visualization
            colored_map = cv2.applyColorMap(normalized_map, cv2.COLORMAP_JET)
            cv2.imwrite(output_path, colored_map)

            # Read the PNG file and convert to base64
            with open(output_path, "rb") as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode()

            return JSONResponse({
                "biomass": average_biomass,
                "raster_map": encoded_image,
                "message": "Prediction successful"
            })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Welcome to the Biomass Prediction API"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

