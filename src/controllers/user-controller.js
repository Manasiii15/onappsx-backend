import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwtToken from "../utils/token-generater.js";


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


export default {
   handleUserSignUp,
   homePage,
   handleUserlogin,
   userProfile
}