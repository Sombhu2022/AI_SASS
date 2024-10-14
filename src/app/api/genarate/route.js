import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { Users } from "@/model/user.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"


export const POST = async(req)=>{
    
    try {
        const { type } = await req.json()
        // dbconnect 
        await dbConnect()

        // check user 
        const userId = getUserDetails()
        if(!userId){
            return ApiError.send('user not authenticated ! ')
        }
        const user = await Users.findById(userId)
        
        // update user details ...
        user.totalGenarate[type] += 1  
   
        await user.save()

        return  ApiResponse.send('update user details success !')
        
    } catch (error) {
        console.log(error);
        
       return ApiError.send()
    }

}