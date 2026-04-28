import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const db = mongoose.connection.useDb('test'); // Wait, the connection is to default DB
    const profileSchema = new mongoose.Schema({}, { strict: false });
    const profileModel = mongoose.model('ProfileCollection', profileSchema);
    const profiles = await profileModel.find({});
    console.log('Profiles:', profiles);
    process.exit(0);
});
