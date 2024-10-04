import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { Users } from "@/model/user.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"
import { sendVerifyEmail } from "@/utils/sendMail"


export const POST = async(req)=>{
    
    try {
        // step1: dbconnect
        await dbConnect()

        //step2: get id into token userdetails
        const id = getUserDetails();
        if(!id){
            return ApiError.send('you are not authenticate')
        }

        //step3: find user 
        const user = await Users.findById(id)
        if(!user){
            return ApiError.send('you are not verified user ... ')
        }

        //step4: send email for : verfiy mail ... 
           
           // genarate token and into user profile
            const token = user.generateToken()
            user.verifyToken = token;
            user.verifyTokenEpiary = user.verifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
            await user.save({ validateBeforeSave: false })

            // send email 
            const isSend = await sendVerifyEmail(user.email , token) 
            if(!isSend){
                console.log("email send faild");     
            }

        return ApiResponse.send('verify mail send successfully , this mail velied upto 1 day , please verify your email' , user)

    } catch (error) {
        console.error(error);
        
        return ApiError.send(error.message )
    }
  
}