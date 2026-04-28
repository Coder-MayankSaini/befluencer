import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  niche: { type: String, required: true },
  location: { type: String, required: true },
  rate: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: false }
});


export default mongoose.model("ProfileCollection", profileSchema);