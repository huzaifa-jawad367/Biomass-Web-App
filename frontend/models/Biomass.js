import mongoose from 'mongoose';

const biomassSchema = new mongoose.Schema({
  coordinates: {
    type: [{
      lat: Number,
      lng: Number
    }],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  biomass: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for faster queries
biomassSchema.index({ userEmail: 1, createdAt: -1 });

const Biomass = mongoose.models.Biomass || mongoose.model('Biomass', biomassSchema);

export default Biomass; 