import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  pwd: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, required: true },
  profilePic: { type: String, default: "" }
});


export default mongoose.model("UserCollection", userSchema);