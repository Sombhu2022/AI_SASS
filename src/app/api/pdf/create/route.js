import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { ApiError, ApiResponse } from "@/utils/customResponse"



export const POST = async(req)=>{
       console.log('this is pdf cretae function');
       
    try {
        const data = await req.json()
        console.log('pdf , fileName' , data);
        
        if(!pdf || !pdf == {} || !fileName){
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