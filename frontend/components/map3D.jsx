"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from "sonner";
import Image from "next/image";

const DrawingMap = ({ user }) => {
  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeCoordinates, setShapeCoordinates] = useState(null);
  const [shapeArea, setShapeArea] = useState(0);
  const [open, setOpen] = useState(false);
  const [biomassData, setBiomassData] = useState(null);
  const [biomassImage, setBiomassImage] = useState(null);
  const [isBiomassLoading, setIsBiomassLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const google = window.google;
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 30.1575, lng: 71.5249 },
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
      });
      setMap(mapInstance);

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        polygonOptions: {
          fillColor: "#00FF00",
          fillOpacity: 0.2,
          strokeWeight: 2,
        },
        rectangleOptions: {
          fillColor: "#0000FF",
          fillOpacity: 0.2,
          strokeWeight: 2,
        },
      });

      drawingManager.setMap(mapInstance);
      drawingManagerRef.current = drawingManager;

      google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
        if (selectedShape) selectedShape.setMap(null);

        const shape = event.overlay;
        shape.type = event.type;
        setSelectedShape(shape);
        setOpen(true);

        let coords, areaInSquareMeters;
        if (shape.type === "polygon") {
          coords = shape.getPath().getArray().map((latLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng(),
          }));
          areaInSquareMeters = google.maps.geometry.spherical.computeArea(shape.getPath());
        } else if (shape.type === "rectangle") {
          const bounds = shape.getBounds();
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          const nw = new google.maps.LatLng(ne.lat(), sw.lng());
          const se = new google.maps.LatLng(sw.lat(), ne.lng());
          coords = [
            { lat: ne.lat(), lng: ne.lng() },
            { lat: nw.lat(), lng: nw.lng() },
            { lat: sw.lat(), lng: sw.lng() },
            { lat: se.lat(), lng: se.lng() },
          ];
          areaInSquareMeters = google.maps.geometry.spherical.computeArea([
            ne, nw, sw, se, ne
          ]);
        }

        setShapeCoordinates(coords);
        setShapeArea(areaInSquareMeters / 1e6); // km²
        setBiomassData(null);
        setBiomassImage(null);
        setError(null);
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (selectedShape) selectedShape.setMap(null);
      if (drawingManagerRef.current) drawingManagerRef.current.setMap(null);
    };
  }, []);

  const handleCalculateBiomass = useCallback(async (onComplete) => {
    if (!shapeCoordinates) return;

    if (shapeArea > 2) {
      toast.warning("Area too large for biomass calculation. Must be under 2 sq km.");
      return;
    }

    setIsBiomassLoading(true);
    setError(null);

    try {
      const formattedCoordinates = shapeCoordinates.map(coord => [coord.lng, coord.lat]);
      const payload = {
        coordinates: [formattedCoordinates],
        batch_size: 16,
        tta: 4,
      };

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to fetch biomass data.");
      const result = await response.json();

      setBiomassData(result);
      setBiomassImage(result.raster_map || null);
      if (result.raster_map) {
        const byteString = atob(result.raster_map.split(",")[1] || result.raster_map);
        const mimeString = "image/png";
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const imageUrl = URL.createObjectURL(blob);
        setBiomassImage(imageUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Error calculating biomass.");
    } finally {
      setIsBiomassLoading(false);
      if (onComplete) onComplete();
    }
  }, [shapeCoordinates, shapeArea]);

  const handleSave = async () => {
    if (!biomassData) {
      toast.error("No biomass data to save.");
      return;
    }

    setIsSaving(true);
    try {
      await saveBiomassRecord({
        image: biomassImage,
        data: biomassData.biomass,
      });
      toast.success("Biomass data saved successfully!");
    } catch {
      toast.error("Error saving biomass data.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveBiomassRecord = async ({ image, data }) => {
    const response = await fetch("/api/biomass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coordinates: shapeCoordinates,
        imageUrl: image,
        biomass: data,
        userEmail: user.email,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Failed to save biomass data");
    }
  };

  const handleSendEmail = () => {
    if (!shapeCoordinates) {
      toast.error("No shape selected.");
      return;
    }

    const emailPayload = () => sendEmail(biomassData);

    if (!biomassData) {
      handleCalculateBiomass(emailPayload);
    } else {
      emailPayload();
    }
  };

  const sendEmail = async (data) => {
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          area: shapeArea.toFixed(4),
          coordinates: shapeCoordinates,
          biomass: data,
        }),
      });

      if (!res.ok) throw new Error("Failed to send email");
      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Error sending email.");
    }
  };


  

  return (
    <div className="h-screen w-full relative mx-2 md:mx-32" style={{ height: "80vh" }}>
      <div ref={mapRef} className="h-full w-full" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selected Area</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {shapeArea > 0 && (
              <p className="text-lg font-semibold">Area: {shapeArea.toFixed(4)} km²</p>
            )}
            {shapeCoordinates && (
              <div>
                <p className="font-bold">Coordinates:</p>
                <ul className="text-sm">
                  {shapeCoordinates.map((coord, idx) => (
                    <li key={idx}>{coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}</li>
                  ))}
                </ul>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {biomassImage && (
              <Image
                src={biomassImage}
                alt="Biomass"
                width={200}
                height={200}
                className="mt-2 w-full h-auto rounded"
              />
            )}
            {biomassData?.biomass && <p>Biomass: {biomassData.biomass} tons</p>}
          </div>
          <DialogFooter>
            <Button
              className="bg-indigo-500 text-white hover:bg-indigo-700"
              disabled={isBiomassLoading}
              onClick={() => handleCalculateBiomass()}
            >
              {isBiomassLoading ? "Calculating..." : "Calculate Biomass"}
            </Button>
            <Button
              className="text-green-600 border-green-500 hover:text-green-800"
              variant="outline"
              disabled={isSaving || !biomassData}
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              className="text-indigo-500 hover:text-indigo-700"
              variant="outline"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DrawingMap;


// "use client";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { Button } from "../components/ui/button";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../components/ui/dialog";
// import { toast } from "sonner";
// import Image from "next/image";

// const DrawingMap = ({ user }) => {
//   const mapRef = useRef(null);
//   const [shapeCoordinates, setShapeCoordinates] = useState(null);
//   const [shapeArea, setShapeArea] = useState(0);
//   const [map, setMap] = useState(null);
//   const drawingManagerRef = useRef(null);
//   const [selectedShape, setSelectedShape] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [biomassData, setBiomassData] = useState(null);
//   const [biomassImage, setBiomassImage] = useState(null);
//   const [isBiomassLoading, setIsBiomassLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // const dataIndexRef = useRef(0);
//   // const biomassOptions = [
//   //   { image: "/images/s1.png", data: 5.306 },
//   //   { image: "/images/s2.png", data: 4.213 },
//   //   { image: "/images/s3.png", data: 3.28 },
//   //   { image: "/images/s4.png", data: 4.751 },
//   //   { image: "/images/s5.png", data: 2.931 },
//   // ];


//   useEffect(() => {
//     const initializeMap = () => {
//       const google = window.google;
//       const mapInstance = new google.maps.Map(mapRef.current, {
//         center: { lat: 30.1575, lng: 71.5249 },
//         zoom: 8,
//         mapTypeId: google.maps.MapTypeId.SATELLITE,
//       });

//       setMap(mapInstance);

//       const drawingManager = new google.maps.drawing.DrawingManager({
//         drawingMode: google.maps.drawing.OverlayType.POLYGON,
//         drawingControl: true,
//         drawingControlOptions: {
//           position: google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: [
//             google.maps.drawing.OverlayType.POLYGON,
//             google.maps.drawing.OverlayType.RECTANGLE,
//           ],
//         },
//         polygonOptions: {
//           fillColor: "#00FF00",
//           fillOpacity: 0.2,
//           strokeWeight: 2,
//           clickable: false,
//           editable: false,
//           zIndex: 1,
//         },
//         rectangleOptions: {
//           fillColor: "#0000FF",
//           fillOpacity: 0.2,
//           strokeWeight: 2,
//           clickable: false,
//           editable: false,
//           zIndex: 1,
//         },
//       });

//       drawingManager.setMap(mapInstance);
//       drawingManagerRef.current = drawingManager;

//       google.maps.event.addListener(
//         drawingManager,
//         "overlaycomplete",
//         function (event) {
//           if (selectedShape) selectedShape.setMap(null);

//           const shape = event.overlay;
//           shape.type = event.type;
//           setSelectedShape(shape);
//           setOpen(true);

//           let coords, areaInSquareMeters;
//           if (shape.type === "polygon") {
//             coords = shape.getPath().getArray().map((latLng) => ({
//               lat: latLng.lat(),
//               lng: latLng.lng(),
//             }));
//             areaInSquareMeters = google.maps.geometry.spherical.computeArea(shape.getPath());
//           } else if (shape.type === "rectangle") {
//             const bounds = shape.getBounds();
//             const ne = bounds.getNorthEast();
//             const sw = bounds.getSouthWest();
//             const nw = new google.maps.LatLng(ne.lat(), sw.lng());
//             const se = new google.maps.LatLng(sw.lat(), ne.lng());
//             coords = [
//               { lat: ne.lat(), lng: ne.lng() },
//               { lat: nw.lat(), lng: nw.lng() },
//               { lat: sw.lat(), lng: sw.lng() },
//               { lat: se.lat(), lng: se.lng() },
//             ];
//             areaInSquareMeters = google.maps.geometry.spherical.computeArea([
//               ne, nw, sw, se, ne
//             ]);
//           }

//           setShapeCoordinates(coords);
//           setShapeArea(areaInSquareMeters / 1000000); // km²
//         }
//       );
//     };

//     if (!window.google) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`;
//       script.async = true;
//       script.onload = initializeMap;
//       document.head.appendChild(script);
//     } else {
//       initializeMap();
//     }

//     return () => {
//       if (selectedShape) selectedShape.setMap(null);
//       if (drawingManagerRef.current) drawingManagerRef.current.setMap(null);
//     };
//   }, [selectedShape]);

//   const saveBiomassRecord = async ({ image, data }) => {
//     try {
//       const response = await fetch("/api/biomass", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           coordinates: shapeCoordinates,
//           imageUrl: image,
//           biomass: data,
//           userEmail: user.email,
//         }),
//       });

//       const result = await response.json();
//       if (!response.ok)
//         throw new Error(result.message || "Failed to save biomass data");
//     } catch (err) {
//       toast.error("Error saving biomass data");
//     }
//   };

//   const handleCalculateBiomass = useCallback(
//     async (onComplete) => {
//       if (!shapeCoordinates) return;
  
//       if (shapeArea > 2) {
//         toast("Area too large for biomass calculation. Must be under 2 sq km.");
//         return;
//       }
  
//       setIsBiomassLoading(true);
//       setError(null);
  
//       try {
//         const formattedCoordinates = shapeCoordinates.map((coord) => [coord.lng,coord.lat]);
  
//         const payload = {
//           coordinates: [formattedCoordinates], // Nested array of coordinates
//           batch_size: 16,
//           tta:4 //false
//         };
  
//         const response = await fetch("http://127.0.0.1:8000/predict", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(payload)
//         });
//         console.log('http://127.0.0.1:8000/predict', response)
//         if (!response.ok) {
//           throw new Error("Failed to fetch biomass data.");
//         }
  
//         const result = await response.json();
//         console.log("Biomass result:", result);
//         setBiomassData(result);
//         // setPredictedBiomass(result.biomass || null);
//         // setSatelliteImageUrl(result.image_url || null);
//         // setIsSatelliteImageVisible(true);
//       } catch (err) {
//         console.error(err);
//         setError("Error calculating biomass.");
//       } finally {
//         setIsBiomassLoading(false);
//         if (onComplete) onComplete();
//       }
//     },
//     [shapeCoordinates, shapeArea]
//   );
  

//   const sendEmail = async (data, image) => {
//     try {
//       const res = await fetch("/api/sendEmail", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: user.email,
//           area: shapeArea.toFixed(4),
//           coordinates: shapeCoordinates,
//           imageUrl: image,
//           biomass: data,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to send email");
//       toast.success("Email sent successfully!");
//     } catch (error) {
//       toast.error("Error sending email.");
//     }
//   };

//   const handleSendEmail = () => {
//     if (!shapeCoordinates) {
//       toast.error("No shape selected.");
//       return;
//     }

//     if (!biomassData) {
//       handleCalculateBiomass((data, image) => {
//         sendEmail(data, image);
//       });
//     } else {
//       sendEmail(biomassData, biomassImage);
//     }
//   };
//   console.log("shapeCoordinates", shapeCoordinates);
//   return (
//     <div
//       className="h-screen w-full relative mx-2 md:mx-32"
//       style={{ width: "80wh", height: "80vh" }}
//     >
//       <div ref={mapRef} className="h-full w-full" />
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Selected Area </DialogTitle>
//           </DialogHeader>
//           <div className="space-y-2">
//             {shapeArea > 0 && (
//               <p className="text-lg font-semibold">
//                 Area: {shapeArea.toFixed(4)} km²
//               </p>
//             )}
//             {shapeCoordinates && (
//               <div>
//                 <p className="font-bold">Coordinates:</p>
//                 <ul className="text-sm">
//                   {shapeCoordinates.map((coord, index) => (
//                     <li key={index}>
//                       {coord.lat.toFixed(6)}, {coord.lng.toFixed(6)}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {error && <p className="text-red-500">{error}</p>}
//             {biomassData && (
//               <Image
//                 src={`${biomassData.raster_map}`} // if in public folder
//                 alt="Biomass"
//                 width={200}
//                 height={200}
//                 className="mt-2 w-full h-auto rounded"
//               />
//             )}
//             {biomassData && <p>Biomass: {biomassData.biomass} tons</p>} 
//           </div>
//           <DialogFooter>
//             <Button className="bg-indigo-500 text-white hover:bg-indigo-700  " onClick={() => handleCalculateBiomass()}>
//               Calculate Biomass
//             </Button>
//             <Button className="text-indigo-500 hover:text-indigo-700" variant="outline" onClick={handleSendEmail}>
//               Send Email
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default DrawingMap;
