import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  coordinates: { type: String, required: true },
  area: { type: String, required: true },
  biomass: { type: String, required: true },
  biomassImage: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;