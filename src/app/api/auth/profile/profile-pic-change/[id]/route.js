import { dbConnect } from "@/db/dbConnection"
import { getUserDetails } from "@/helpers/getUserDetails";
import { Users } from "@/model/user.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { fileDestroy, fileUploader } from "@/utils/imageUpload";


export const POST = async(req ,{params})=>{
       
       const { image } =await req.json()
       const { id } = params
 
    try {


       //step1: db connect
       await dbConnect();

       // check image is exist or not 
       if(!image){
            return ApiError.send('image file not found ! , please put valid image')
       }

       // step2: check user
           const authId = getUserDetails() 

           // two fector authentication
           if( id !== authId){
            return ApiError.send('user not authenticated !')
           }
     
          const user = await Users.findById(id)
          if(!user){
             return ApiError.send('user not found !')
          }

       // step3: delete image
       const path = user.profile_pic.public_id || false
       const isDelete = await fileDestroy(path) 
       console.error(isDelete?'file deleted':'file not delete!')

       // step4: upload new image 
        const { url , public_id , error} = await fileUploader(image)
        console.log(url);
        
        if(error){
           return ApiError.send("file upload faild " , 400)
        }

        const tempImage = {
            url ,
            public_id
            }
        
        // step5: save file in cloudinary
        user.profile_pic = tempImage

        await user.save()
        
        return ApiResponse.send('profile pic update successfull' , {image:user.profile_pic.url ||''})

    } catch (error) {
        console.error(error);
        return ApiError.send()
    }

}