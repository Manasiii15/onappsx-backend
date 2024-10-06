import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://x2lcrkk2g3m81lpd.public.blob.vercel-storage.com/avatar-8hMgA3YyTyBM47XB0iiuLGwMufzlCY.webp",
    },
    profilePicturePublicId:{
        type:String
    }
},{timestamps: true})



const User = mongoose.model('User',userSchema);

export default User;