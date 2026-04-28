import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const profileModel = mongoose.model('ProfileCollection', new mongoose.Schema({}, { strict: false }));
    const indexes = await profileModel.collection.getIndexes();
    console.log('Indexes:', indexes);
    process.exit(0);
});
