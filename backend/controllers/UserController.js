
import userModel from "../models/userModel.js";
import profileModel from "../models/InfluencerProfile.js";
import uploadFile from "../services/storage.services.js";
import axios from "axios";


async function saveUser(req, res) {

  //console.log("console"+JSON.stringify(req.body));
  // res.send(JSON.stringify(req.body));

  try {
    //  console.log(req.body);
    const newUser = new userModel(req.body);
    await newUser.save();
    res.json({ status: 202, msg: "User saved successfully!" });
  } catch (err) {
    console.error(err);
    res.json({ status: 503, msg: "Failed to save user." });
  }
}

function checkUser(req, res) {
  console.log(JSON.stringify(req.body));

  userModel.findOne({ email: req.body.email, pwd: req.body.pwd })
    .then((docu) => {
      if (docu != null)
        res.json({ status: true, msg: "Record found", obj: docu });
      else
        res.json({ status: false, msg: "Invalid Email or password " });
    })
    .catch((err) => {
      return res.json({ status: false, msg: err.message });
    });
}

async function saveProfile(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: false, msg: "Email required to update profile." });

    // Upsert (update if exists, otherwise insert)
    await profileModel.findOneAndUpdate(
      { email },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ status: true, msg: "Profile updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Failed to update profile." });
  }
}

async function uploadProfilePic(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ status: false, msg: "No image file provided." });
    }

    // Upload file to ImageKit
    const result = await uploadFile(req.file.buffer, req.file.originalname || 'profilePic.jpg');

    const email = req.body.email;
    if (email) {
      await userModel.findOneAndUpdate({ email: email }, { profilePic: result.url });
    }

    // Optionally update user profile if explicitly requested, but returning URL is the most flexible:
    res.json({
      status: true,
      msg: "Profile picture uploaded successfully!",
      imageUrl: result.url,
      fileId: result.fileId
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ status: false, msg: "Failed to upload image." });
  }
}


async function getAllInfluencers(req, res) {
  try {
    const influencers = await userModel.find({ userType: "influencer" }, { pwd: 0 }); // Exclude password
    res.json({ status: true, msg: "Fetched all influencers", data: influencers });
  } catch (error) {
    console.error("Error fetching influencers:", error);
    res.status(500).json({ status: false, msg: "Failed to fetch influencers." });
  }
}

async function getProfile(req, res) {
  try {
    const { email } = req.params;
    const profile = await profileModel.findOne({ email });
    res.json({ status: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Failed to fetch profile." });
  }
}

export default { saveUser, checkUser, saveProfile, uploadProfilePic, getAllInfluencers, getProfile }
