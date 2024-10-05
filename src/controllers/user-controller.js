import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwtToken from "../utils/token-generater.js";
import cloudupload from "../utils/cloudupload.js";

// import fs from 'fs';
// import path from 'path';


async function homePage(req, res) {
   return res.status(200).json({ message: "user route home page" })
}

async function handleUserSignUp(req, res) {
   try {
      const data = req.body;
      const pass = data.password

      const verifiedEmail = await User.findOne({ email: data.email })
      if (verifiedEmail) {
         return res.status(400).json({ message: "Email allredy exits!" })
      }

      if (pass.length <= 7) {
         return res.status(400).json({ message: "Password shoud be 8 charter or more" })
      }


      await User.create(data);

      const newUser = await User.findOne({ email : data.email})
      const token = await jwtToken.tokenGenerator({
         email: newUser.email,
         id: newUser._id
      })

      return res.setHeader("Authorization", `Bearer ${token}`).status(201).json({ message: "User Create Sucessfully" })


   } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "fill the all required field" })
   }
}

async function handleUserlogin(req, res) {
   try {
      const data = req.body;
      const { password, email } = data;
      const header = req.header("Authorization")
      if (header) {
         res.send("hello")
      }
      if (password.length <= 7) {
         return res.status(400).json({ message: "Password shoud be 8 charter or more" })
      }

      const verifiedEmail = await User.findOne({ email: email })

      if (verifiedEmail) {
         const verifiedPassword = await bcrypt.compare(password, verifiedEmail.password)

         if (verifiedPassword) {

            const token = await jwtToken.tokenGenerator({
               email: verifiedEmail.email,
               id: verifiedEmail._id
            })
            
            return res.setHeader("Authorization", `Bearer ${token}`).status(200).json({ message: "User Login Sucessfully" })

         }
      }


      return res.status(400).json({ message: "invalid email or Password" })



   } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "error" })
   }
}

async function userProfile(req, res) {
   try {
      const data = req.body
      const userDetails = data
   
      if (userDetails) {

        const userData = await User.findOne({ email: userDetails.email });

        
            res.status(200).json({ message: userData })
        
         
      }

   } catch (error) {

      res.status(401).json({ message: "null value" })
   }

}

async function userProfilePic(req, res) {
   try {
      const data = req.body
      const userDetails = data
   
      if (userDetails) {

        const userData = await User.findById(userDetails.id);

        if (!userData) {
         return res.status(404).json({ message: "User not found" });
      }

      // Create a response object with only the profileImage field
      const userpic = {
         profileImage: userData.profilePicture
      };

            res.status(200).json({ userpic })
        
         
      }
      
   } catch (error) {

      res.status(401).json({ message: "null value" })
   }

}

async function handleProfilePictureUpload(req, res) {
   try {
       const userId = req.body.id;
console.log(req.body.id);
       // Ensure the file was uploaded
       if (!req.file) {
           return res.status(400).json({ message: 'No file uploaded' });
       }

       const profilePicturePath = req.file.path; // New profile picture Cloudinary URL
       const profilePicturePublicId = req.file.filename; // New profile picture Cloudinary public ID
       console.log(req.file.path);


       // Fetch the user to get the current profile picture path
       const user = await User.findById(userId);
       if (!user) {
           return res.status(404).json({ message: 'User not found' });
       }

      
       // Check if the user has an existing profile picture
       const oldProfilePicture = user.profilePicture;
       const oldProfilePicturePublicId = user.profilePicturePublicId;
       const defaultProfilePicture = 'avatar.webp';

       if (oldProfilePicture && oldProfilePicture !== defaultProfilePicture) {
         // Delete the old profile picture from Cloudinary
         if (oldProfilePicturePublicId) {
            const meaas = await cloudupload.removeimagecloud(oldProfilePicturePublicId)
             console.log("deleating",meaas);
         }
     }


     const result = await cloudupload.uploadimagefuncton(profilePicturePath,profilePicturePublicId)
       
     console.log(result.url);

      //  Update the user's profile picture in the database
       user.profilePicture = result.secure_url; // Store the Cloudinary URL
       user.profilePicturePublicId = result.public_id; 
      // Store the public ID for deletion later

      await user.save();

       // Respond with success message
       console.log("okkkkkk");

       return res.status(200).json({ message: 'Profile picture uploaded successfully', file: req.file });

   } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Server error while uploading profile picture' });
   }
}

export default {
   handleUserSignUp,
   homePage,
   handleUserlogin,
   userProfile,
   handleProfilePictureUpload,
   userProfilePic
}