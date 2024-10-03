import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { ApiError, ApiResponse } from "@/utils/customResponse"


export const GET = async(request)=>{

    try {
        // db connect 
        await dbConnect()
        
        const isAuthenticate = getUserDetails()

        if(!isAuthenticate) {
            return ApiError.send('you are not authenticate' , 400)
        }

        const cookies = [
            {
                name:'token',
                value:''
            }
        ]

        return ApiResponse.send('logout successfull',null ,200 ,cookies)

    } catch (error) {
        
        return ApiError.send()
    }

}