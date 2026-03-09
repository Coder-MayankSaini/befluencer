import userPostModel from '../models/userPost.model.js';
import uploadFile from '../services/storage.services.js';

async function createPost(req, res) {
    try {
        console.log("Create Post request received");
        const { title, description } = req.body;
        console.log("Body:", { title, description });
        
        // Ensure an image file was uploaded
        if (!req.file) {
            console.log("No file provided");
            return res.status(400).json({ status: false, msg: "Image file is required" });
        }
        console.log("File received:", req.file.originalname, "(size:", req.file.size, ")");

        // Upload the image buffer to ImageKit
        console.log("Uploading to ImageKit...");
        const imageKitResponse = await uploadFile(req.file.buffer, req.file.originalname);
        console.log("ImageKit upload successful:", imageKitResponse.url);
        
        // Save post to MongoDB
        const newPost = new userPostModel({
            title,
            description,
            image: imageKitResponse.url // URL provided by ImageKit
        });
        
        await newPost.save();
        
        res.json({ status: true, msg: "Post created successfully!", post: newPost });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ status: false, msg: "Failed to create post.", error: err.message });
    }
}

export default { createPost };
