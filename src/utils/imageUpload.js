
import cloudinary from "@/config/cloudinary";

export const fileUploader = async (file , type='image')=>{

    try {
        const data =await cloudinary.uploader.upload(file ,{
          folder:'thik-ai'
        })

      return { url:data.secure_url , public_id: data.public_id , error:null}  
    } catch (error) {
        return { url:null , public_id:null , error}
    }

}