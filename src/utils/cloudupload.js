import { v2 as cloudinary } from 'cloudinary';



// const uploadimagefuncton = async(file,id)=>{

//     cloudinary.config({ 
//         cloud_name: process.env.CLOUD_NAME, 
//         api_key: process.env.API_KEY, 
//         api_secret: process.env.API_SECRET
//     });


//     const uploadResult = await cloudinary.uploader
//     .upload(
//         file, {
//             public_id: id,
//             folder: 'onappx'
//         }
//     )
//     .catch((error) => {
//         console.log(error);
//     });
 
//  console.log(uploadResult);

// return uploadResult
// }
const uploadimagefuncton = async (buffer, id) => {

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ public_id: id, folder: 'onappx' }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);  // Here we pass the file buffer
    });
};

const removeimagecloud = async(public_id)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });
    const imagedelete = await cloudinary.uploader.destroy(public_id)

    console.log(imagedelete);
}

export default {uploadimagefuncton,removeimagecloud}