
import cloudinary from "@/config/cloudinary";

export const fileUploader = async (file , type='image')=>{

  const options = {
    folder: 'thik-ai',
    ...(type === 'pdf' && { resource_type: 'raw' }), // Use spread operator for cleaner code
  };

    try {
        const data =await cloudinary.uploader.upload(file ,options)

      return { url:data.secure_url , public_id: data.public_id , error:null}  
    } catch (error) {
        return { url:null , public_id:null , error}
    }

}

export const fileDestroy = async( file_path )=>{

  if(file_path){
    try {
       
      const data = await cloudinary.uploader.destroy(file_path)
      // console.log(data);
      return true
  
    } catch (error) {
      console.error(error);
      
      return false
    }

  }
  return false

}