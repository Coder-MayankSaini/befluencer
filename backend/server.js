import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';
import cors from 'cors'; // Importing CORS middleware

import UserRoute from './routers/UserRoutes.js';// Importing user routes

dotenv.config();

let app = express();
 
app.use(express.json()); // Middleware to parse JSON bodies

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors()); // Enable CORS for all routes
const PORT = process.env.PORT || 2001;

app.use("/user",UserRoute);

app.listen(PORT, function() {
    console.log(`server started at port ${PORT}`);
})

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, // Optional: adjust if you have slow internet
})
.then(() => {
  console.log(' Connected to MongoDB Atlas');
  
})
.catch((err) => {
  console.error(' MongoDB connection error:', err.message);
  console.error(' Check your MONGO_URI in .env file');
  console.error(' Make sure your IP is whitelisted in MongoDB Atlas');
});



// MCQ Generation endpoint (different from resume generation)




