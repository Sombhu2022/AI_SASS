import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails"
import { Users } from "@/model/user.model"
import { ApiError, ApiResponse } from "@/utils/customResponse"



export const PATCH = async(req , {params})=>{

    try {

        const { id } = params
        const inputData = await req.json()
        console.log(inputData);
        
        //db connect 
        await dbConnect()

        // ckeck two factor auth
        const userId = getUserDetails()

        if(userId !== id ){
            return ApiError.send('two fatcor authenticate is false , You are Unauthorised !' , 400)
        }

        // check email and userName exist or not 
        // const email = inputData?.email || ''
        // if(email){
        //     const findUser = await Users.findOne({email})
        //     if(findUser){
        //         return ApiError.send('UserName already Exist ! , please try another UserName')
        //     }
        // }

        // const userName 


        // update user profile 
        const user = await Users.findByIdAndUpdate(id , {$set:inputData} , {new:true})

        // check user 
        if(!user){
            return ApiError.send('user not authenticate')
        }
        
        // create token
        const token =await user.generateToken()
       
        const cookies = [ { name:'token' , value: token}]

        return ApiResponse.send('update success' , user , 200 , cookies )
        
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            // Duplicate key error  , if user name or email is exist then return this custom error 
            const duplicateField = Object.keys(error.keyPattern)[0];
            const message = duplicateField === "userName" ? 
                            "This username already exists! Please try another username." :
                            "This email already exists! Please try another email.";
            
            return ApiError.send(message , 400 , error)
          }
        
        return ApiError.send(error?.message || 'somthing error , please try again !', 500 , error)
    }
}