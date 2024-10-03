import { dbConnect } from "@/db/dbConnection";
import { getUserDetails } from "@/helpers/getUserDetails";
import { Users } from "@/model/user.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";


export const GET = async(req)=>{
    
    try {
        // db cnnection
        await dbConnect()

        const userId =await getUserDetails()
       
        
        if(!userId){
            return ApiError.send("user not authenticated" , 400)
        }

        const user =await Users.findById(userId).select(" -password ")
        
        if(!user){
            return ApiError.send("user not authenticated" , 400)
        }

        // console.log("this is profile page api" , user);
        return ApiResponse.send("user successfully find" , {user})
        
    } catch (error) {
        return ApiError.send()
    }
    
}