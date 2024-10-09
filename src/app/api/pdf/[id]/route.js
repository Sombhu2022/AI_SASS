import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { Storage } from "@/model/storage.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"
import { fileDestroy } from "@/utils/imageUpload"

export const GET = async(req , {params})=>{
    try {
        const { id } = params
        //dbconnect 
        await dbConnect()
        // check user authentication
        const userId = getUserDetails()
        if(!userId){
            return ApiError.send('user not authenticate' )
        }
        // pdf fetch 
         const data = await Storage.find({userId , _id:id})
         if(!data){
            return ApiError.send(' pdf not exist !')
         }
        // send res 
        return ApiResponse.send('pdf find success' , data )

    } catch (error) {
        return ApiError.send()
    }
}

export const DELETE = async(req , {params})=>{
    try {
        const { id } = params
        // db connection 
        await dbConnect()
       
       // check user authentication 
       const userId = getUserDetails()
       if(!userId){
        return ApiError.send('user not authenticated !')
       }
       
       const pdf = await Storage.findById(id)
       if(!pdf){
        return ApiError.send('pdf not found !')
       }   
    
       const del = await fileDestroy(pdf.pdfs.public_id)
       if(!del){
        console.log('file not deleted');
       }

       await Storage.findByIdAndDelete(id)
       return ApiResponse.send('pdf delete success ')

    } catch (error) {
        return ApiError.send()
    }
}