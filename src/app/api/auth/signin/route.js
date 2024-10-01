import { dbConnect } from "@/db/dbConnection"
import { Users } from "@/model/user.model"
import { generateOTP } from "@/utils/otpGenarater"
import { sendEmail } from "@/utils/sendMail"
import { NextResponse } from "next/server"



export const POST = async(req )=>{
     
    const { authId , password } = await req.json()
    console.log(authId , password);
    
    try {
        // connect database
        dbConnect()

        //ckeck all field 
        if(!authId || !password){
            return NextResponse.json({message:"required authId (email or username ) and password"})
        }
          
        //check user exist or not 
        let user = await Users.findOne({
            $or:[
                {email: authId},
                {userName: authId}
            ]
        })

        if(!user){
            return NextResponse.json({message:"your authId (email or username ) or password is wrong !"},{status:400})
        }
        // compare password 
        const isPasswordMatch = await user.comparePassword(password);

        // check password right or not 
        if(!isPasswordMatch){
            return NextResponse.json({message:"your authId (email or username ) or password is wrong !"},{status:400})
        }        
        console.log("ok1");
        
        // check two step othentication and send otp in a mail
        if(user.isTwoStepAuth){
            const otp = generateOTP() 
            const isSend = await sendEmail(user.email , "Two step Auth" , `${otp} this is your Two Step Auth OTP , Don't share anyother`) 

            if(!isSend){
            return NextResponse.json({message:"Internal error , mail send faild ! "},{status:500})    
            }

            user.otp = otp;
            user.otpExpiary = Date.now() + 3 * 60 * 1000 ; // set otp expiry time for 5 min
            
            const data = await user.save({ valauthIdateBeforeSave : false});

            return NextResponse.json({message:"otp send succesfully" , success:true , isTwoStepAuth:true } , {status:200})
        }
        
        console.log("ok2");
        
        // if not allow two step authentication then genarate token
        const token = user.generateToken()
        
        //and set token and send
        const response = NextResponse.json({message:"user login successfully" , success:true , isTwoStepAuth:false} , {status:200})
        
        response.cookies.set('token' , token , { httpOnly : true})
        return response;
    
      } catch (error) {
        console.log(error);
        return NextResponse.json({message:"somthing error , please try again" , error} ,{status:400} )
     }

}