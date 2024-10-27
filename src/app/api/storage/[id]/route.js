import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails";
import { Storages } from "@/model/storage.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { fileDestroy } from "@/utils/imageUpload";


export const DELETE = async (req, { params }) => {
    try {
        await dbConnect()
        const { id } = params

        // 2. User validation
        const userId = getUserDetails();
        if (!userId) return ApiError.send('User not authenticated');

        // delete file into cloudinary 
        const storage = await Storages.findById({_id:id })
        const path = storage.public_id
        const isDelete = await fileDestroy(path) 
        
        if(!isDelete){
          return ApiError.send('Somthing error in Cloude , file not delete !')
        }else{
            console.info('file delete success');
        }


        //  3.storage find 
         await Storages.findByIdAndDelete({_id:id })
        
        return ApiResponse.send('file delete successfully !', { storage })

    } catch (error) {
        console.error(error)
        return ApiError.send()
    }
}