import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { Primes } from "@/model/prime.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"


export const GET = async()=>{
    try {
        // dbconnect 
        await dbConnect()
         // check user authentication
         const userId = getUserDetails()
         if(!userId){
             return ApiError.send('user not authenticate' )
         }
         // pdf fetch 
          const data = await Primes.findOne({userId})
          if(!data){
             return ApiError.send(' pdf not exist !')
          }
         // send res 
         return ApiResponse.send('prime offerce get success' , data )

    } catch (error) {
        return ApiError.send()
    }
}