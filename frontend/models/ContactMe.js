import mongoose from "mongoose";

const ContactMeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const ContactMe = mongoose.models.ContactMe || mongoose.model("ContactMe", ContactMeSchema);
export default ContactMe;