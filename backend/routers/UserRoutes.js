import express from "express";
import controller from "../controllers/UserController.js"; // default import for CommonJS controller

const router = express.Router();

router.post("/saveUser", controller.saveUser);
router.post("/checkUser",controller.checkUser);
router.post("/saveProfile",controller.saveProfile);

export default router;