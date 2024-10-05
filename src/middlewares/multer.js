import multer from "multer"

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         const sanitizedFileName = file.originalname.replace(/\s+/g, '-');
//       const uniqueSuffix = Date.now() + sanitizedFileName
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
  const storage = multer.diskStorage({})
  const upload = multer({ storage: storage })


  
  export default upload