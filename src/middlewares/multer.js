import multer from "multer"

// Set up multer storage for Cloudinary

  const storage = multer.diskStorage({})
  const upload = multer({ storage: storage })


  
  export default upload