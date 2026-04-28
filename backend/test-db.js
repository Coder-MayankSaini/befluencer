import mongoose from 'mongoose';
import dotenv from 'dotenv';
import profileModel from './models/InfluencerProfile.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      await profileModel.findOneAndUpdate(
        { email: 'test@test.com' },
        { email: 'test@test.com', name: 'Test', niche: 'Tech', location: 'NY', rate: '100', bio: 'Test bio' },
        { new: true, upsert: true }
      );
      console.log("Success");
    } catch (e) {
      console.log("Error inserting:", e);
    }
    mongoose.connection.close();
  })
  .catch(e => console.log("DB connection error:", e));
