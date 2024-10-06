import { put } from "@vercel/blob";

// import cloudupload from "../utils/cloudupload.js";

async function uploades(req,res){
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
        // Upload the file to Vercel Blob
        const blob = await put(req.file.originalname, req.file.buffer, {
          access: 'public', // File will be publicly accessible
          contentType: req.file.mimetype // MIME type of the file
        });
    
        // Send back the Blob URL
        res.status(200).json({ message: 'File uploaded successfully', url: blob.url });
      } catch (error) {
        console.error('Error uploading file to Vercel Blob:', error);
        res.status(500).json({ message: 'File upload failed' });
      }
}

export default uploades