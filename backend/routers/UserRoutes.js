import express from "express";
import multer from "multer";
import controller from "../controllers/UserController.js"; 

const router = express.Router();
const upload = multer(); // Use memory storage by default

router.post("/saveUser", controller.saveUser);
router.post("/checkUser", controller.checkUser);
router.post("/saveProfile", controller.saveProfile);
router.get("/getProfile/:email", controller.getProfile);
router.post("/uploadProfilePic", upload.single("image"), controller.uploadProfilePic);
router.get("/influencers", controller.getAllInfluencers);

export default router;
