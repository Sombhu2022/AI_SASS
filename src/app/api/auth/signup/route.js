import { dbConnect } from "@/db/dbConnection"
import { Users } from "@/model/user.model"
import { fileUploader } from "@/utils/imageUpload"
import { sendEmail } from "@/utils/sendMail"
import { NextResponse } from "next/server"

export const POST = async(req)=>{
  
    const { image , email , password , userName , fullName } = await req.json()
    
    try {

        // database connectivity
        dbConnect()
   
        // check all filed present or not
        if (!image || !email || !password || !userName ){
            return NextResponse.json({message:"required field must be put"}, {status:400})
        }

        // find user exist or not using email or username
        const isExist = await Users.findOne({
            $or: [
                { email: email },
                { userName: userName }
            ]
        });

        if(isExist){
            return NextResponse.json({message:"this email or username already exist "}, {status:400})
        }


        // upload image in cloudinary 
        const { url , public_id , error} = await fileUploader(image)
        console.log(url);
        
        if(error){
           return NextResponse.json({message:"file upload faild " , success: false} , {status:400})
        }

        const tempImage = {
            url ,
            public_id
            }
        
        // crate user instance
        const user = new Users({
            userName ,
            fullName:fullName || "",
            email,
            password,
            profile_pic:tempImage

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
        // create response 
        const response = NextResponse.json(
            { message: "Registration successful", data: user, token },
            { status: 200 }
          );
      
          // Set the cookie properly
          response.cookies.set("token", token, {
            httpOnly: true,
          });
      
          return response;
    
   

    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"somthing wrong , please check connection" , error}, {status:400})

    }
}