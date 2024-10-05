import { dbConnect } from "@/db/dbConnection"
import { Users } from "@/model/user.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"
import { fileUploader } from "@/utils/imageUpload"
import { sendEmail } from "@/utils/sendMail"


export const POST = async(req)=>{
  
    const { email , password , userName , fullName } = await req.json()
    
    try {

        // database connectivity
        dbConnect()
   
        // check all filed present or not
        if (!email || !password || !userName ){
            return ApiError.send("required field must be put", 400)
        }

        // find user exist or not using email or username
        const isExist = await Users.findOne({
            $or: [
                { email: email },
                { userName: userName }
            ]
        });

        if(isExist){
            return ApiError.send("this email or username already exist ", 400)
        }
        
        // crate user instance
        const user = new Users({
            userName ,
            fullName:fullName || "",
            email,
            password
        }) 

        // genarate cookice
        const token = user.generateToken()
        // const token = 123445
        
        // save user
        await user.save()

        // send registration mail
        const isSend = await sendEmail(email , "register success" , " you have succesfully register") 
        if(!isSend){
            console.log("email send faild");
            
        }

        //cookies 
        const cookies = [
            {
                name:'token',
                value:token
            }
        ]

        // create response 
        return ApiResponse.send('registration successfull' , {data:user} ,200 , cookies)
    
   

    } catch (error) {
        console.error(error)
        return ApiError.send("somthing wrong , please check connection" ,{ error}, 400)

    }
}