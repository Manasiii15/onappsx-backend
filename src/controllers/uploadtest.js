
import cloudupload from "../utils/cloudupload.js";

async function uploades(req,res){
    try {
        if (req.file) {
            console.log(req.file);

            console.log(req.file.path);
            const data = await cloudupload.uploadimagefuncton(req.file.path)
            // console.log("this is data",data);
            res.json({message:"image upload successfully"},data)
            
        }else{
            res.json({message:"error"})
        }
        
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Server error while uploading profile picture' });
    }
}

export default uploades