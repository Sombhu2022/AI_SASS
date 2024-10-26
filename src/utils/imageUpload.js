
import cloudinary from "@/config/cloudinary";

export const fileUploader = async (file , type='image')=>{

  const options = {
    folder: 'thik-ai',
    ...(type === 'text' && { resource_type: 'raw' }), // Use spread operator for cleaner code
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



/**
 * fileUploader function to upload in-memory data to Cloudinary
 * @param {Buffer} fileBuffer - The buffer data to upload
 * @param {String} fileName - Name or identifier for the file
 * @returns {Object} - The URL, public_id of the uploaded file, or an error message
 */
export const bufferFileUploader = async (fileBuffer) => {
  try {
    // Upload to Cloudinary from the buffer
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: 'thik-ai' }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(fileBuffer);
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      error: null,
    };
  } catch (error) {
    return {
      url: null,
      public_id: null,
      error: error.message,
    };
  }
};