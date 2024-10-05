import { dbConnect } from "@/db/dbConnection"
import { Users } from "@/model/user.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"
import jwt from 'jsonwebtoken'

export const POST = async(request , {params})=>{
  
    const { verifyToken } = params
    console.log("" ,verifyToken);
    
    try {
        
       //step1 : dbconnect
        await dbConnect()
       
       //step3:  find user using verifyToken
        const user = await Users.findOne({verifyToken: verifyToken , verifyTokenEpiary:{$gt:Date.now()}})
        if(!user){
            return ApiError.send('Invalid Token ! , please verify request again')
        }
       // step4: isVerify - true 
       user.isVerify = true 
       user.verifyToken = null 
       user.verifyTokenEpiary = null 
       
       await user.save()

       return ApiResponse.send('Well done , your Email is Verified '  )

    } catch (error) {
    //    console.error(error);
        return ApiError.send()
    }

}