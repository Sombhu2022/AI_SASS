import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails";
import { Storages } from "@/model/storage.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { bufferFileUploader, fileDestroy } from "@/utils/imageUpload";


export const GET = async (req, { params }) => {
    try {
        // db connection 
        await dbConnect()
        const { id } = params
        // check user authentication 
        const userId = getUserDetails()
        if (!userId) return ApiError.send('user not authenticated !')

        const file = await Storages.findById(id)
        return ApiResponse.send('file fetch successfully', { file })
    } catch (error) {
        return ApiError.send()
    }
}


export const PATCH = async (req, { params }) => {
    try {

        await dbConnect()
        const { id } = params
        const { markdownData, fileName } = await req.json();

        // 1. Input validation
        if (!markdownData || !fileName) {
            return ApiError.send('Markdown data or filename missing');
        }

        // 2. User validation
        const userId = getUserDetails();
        if (!userId) return ApiError.send('User not authenticated');

        // delete file into cloudinary 
        const storage = await Storages.findById({ _id: id })
        const path = storage.public_id
        const isDelete = await fileDestroy(path)

        if (!isDelete) {
            return ApiError.send('Somthing error in Cloude ,previous file not delete !')
        } else {
            console.info('file delete success');
        }

        // update data ..
        // 4. upload markdown data
        const { url, public_id, error } = await bufferFileUploader(Buffer.from(markdownData, 'utf-8'));
        if (error) {
            return ApiError.send('Error during file upload to Cloudinary');
        }

        // update data 
        storage.name = fileName
        storage.url = url
        storage.public_id = public_id

        await storage.save();

       return  ApiResponse.send('file update successfully ' , {storage})


    } catch (error) {

        ApiError.send()
    }
}


export const DELETE = async (req, { params }) => {
    try {
        await dbConnect()
        const { id } = params

        // 2. User validation
        const userId = getUserDetails();
        if (!userId) return ApiError.send('User not authenticated');

        // delete file into cloudinary 
        const storage = await Storages.findById({ _id: id })
        const path = storage.public_id
        const isDelete = await fileDestroy(path)

        if (!isDelete) {
            return ApiError.send('Somthing error in Cloude , file not delete !')
        } else {
            console.info('file delete success');
        }


        //  3.storage find 
        await Storages.findByIdAndDelete({ _id: id })

        return ApiResponse.send('file delete successfully !', { storage })

    } catch (error) {
        console.error(error)
        return ApiError.send()
    }
}