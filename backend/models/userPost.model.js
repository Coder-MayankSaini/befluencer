import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  email:{type:String,required:true},
  title:{type:String,required:true},
  description:{type:String,required:true},
  image:{type:String,required:true},
  
})

export default mongoose.model('UserPost',postSchema);