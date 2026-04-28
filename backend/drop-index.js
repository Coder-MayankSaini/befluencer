import mongoose from 'mongoose';
import dotenv from 'dotenv';
import profileModel from './models/InfluencerProfile.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      await profileModel.collection.dropIndex('location_1');
      console.log("Index location_1 dropped successfully.");
    } catch (e) {
      console.log("Error dropping index:", e);
    }
    mongoose.connection.close();
  })
  .catch(e => console.log("DB connection error:", e));
