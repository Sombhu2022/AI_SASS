import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { Storage } from "@/model/storage.model";
import { ApiError, ApiResponse } from "@/utils/customResponse"



export const POST = async(req)=>{
       console.log('this is pdf cretae function');
       
    try {
        const data = await req.json()
        console.log('pdf , fileName' ,data);
        
        if(!data.pdf || !data.pdf == {} || !data.fileName){
            return ApiError.send('pdf file or pdf fileName not found !')
        }
        // step1: dbconnect 
        await dbConnect()

        // step2: get user id
        const userId = getUserDetails()

        if(!userId){
            return ApiError.send('user not authenticate')
        }

        // step3: upload pdf 

        
        // step4: create pdfs model
        // response    
         return ApiResponse.send('pdf upload successfully .')

    } catch (error) {
        console.log(error);
        
        return ApiError.send()
    }
}



export const GET = async(req)=>{
    try {
        // db connection
        await dbConnect(); 
        // check user authentication
        const userId = getUserDetails()
        
        if(!userId){
            return ApiError.send('user not authenticat !')
        }

        // get all pdf 
        const pdf = await Storage.find({userId})

        if(!pdf || pdf.length == 0){
            return ApiError.send('Your storage is empty , no any pdf here ')
        }
       
        return ApiResponse.send('All pdf are here ' , pdf , )

    } catch (error) {
        return ApiError.send()
    }
}




// import multer from 'multer';
// import nextConnect from 'next-connect';
// import cloudinary from '../../utils/cloudinary';
// import { Readable } from 'stream';
// import { ApiError, ApiResponse } from '@/utils/customResponse';

// // Configure multer
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     return ApiError.send('somthing else')
//   },
//   onNoMatch(req, res) {
//     return ApiResponse.send('ok , run')
//   },
// });

// apiRoute.use(upload.single('file'));

// apiRoute.post(async (req, res) => {
//   try {
//     const { file } =await req;

//     // Convert buffer to readable stream for Cloudinary upload
//     const streamUpload = (buffer) => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: 'raw', folder: 'pdf-uploads' },
//           (error, result) => {
//             if (result) {
//               resolve(result);
//             } else {
//               reject(error);
//             }
//           }
//         );

//         const readable = new Readable();
//         readable._read = () => {};
//         readable.push(buffer);
//         readable.push(null);
//         readable.pipe(stream);
//       });
//     };

//     const result = await streamUpload(file.buffer);

//     // Return success response with custom class
//     res.status(200).json(new ApiSuccess(result, 'File uploaded successfully!'));
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);

//     // Return error response with custom class
//     res.status(500).json(new ApiError('Failed to upload file'));
//   }
// });

// export default apiRoute;

// // Disable Next.js built-in body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
