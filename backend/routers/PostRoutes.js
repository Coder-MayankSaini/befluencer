import express from "express";
import multer from "multer";
import controller from "../controllers/PostController.js";

const router = express.Router();



// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the route for creating a post, expecting a single file field named 'image'
router.post("/create-post", upload.single("image"), controller.createPost);
router.post("/fetch-post",  controller.fetchPosts);


export default router;
