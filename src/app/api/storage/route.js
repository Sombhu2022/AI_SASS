import { dbConnect } from "@/db/dbConnection";
import { getUserDetails } from "@/helpers/getUserDetails";
import { Storages } from "@/model/storage.model";
import { ApiError, ApiResponse } from "@/utils/customResponse";
import { bufferFileUploader, fileUploader } from "@/utils/imageUpload";
// import fs from 'fs';
// import path from 'path';

export const POST = async (req) => {
  try {
    const { markdownData, fileName } = await req.json();
    
    // 1. Input validation
    if (!markdownData || !fileName) {
      return ApiError.send('Markdown data or filename missing');
    }
    
    // 2. DB connection
    await dbConnect();

    // 3. User validation
    const userId = getUserDetails();
    if (!userId) return ApiError.send('User not authenticated');

    // 4. Convert markdown data to text file in a custom folder
    // const customFolderPath = path.join(process.cwd(), 'upload');
    // if (!fs.existsSync(customFolderPath)) {
    //   fs.mkdirSync(customFolderPath);
    // }
    // const filePath = path.join(customFolderPath, `${fileName}.txt`);
    // fs.writeFileSync(filePath, markdownData);

    // // 5. Upload text file to Cloudinary
    // const { url, public_id, error } = await fileUploader(filePath, 'text');
    const { url, public_id, error } = await bufferFileUploader(Buffer.from(markdownData , 'utf-8'));
    if (error) {
    //   fs.unlinkSync(filePath);
      return ApiError.send('Error during file upload to Cloudinary');
    }

    // // 6. Remove the temporary file after upload
    // fs.unlinkSync(filePath);


    // 7. Store the uploaded file’s information
    const tempFile = {
      url,
      public_id,
      name: fileName
    };

    // 8. Save file URL to storage table
    let storage = await Storages.findOne({ userId });

    if (!storage) {

      storage = await Storages.create({
        userId,
        files: [tempFile],
        totalFile: 1
      });
    } else {
      storage.files.push(tempFile);
      storage.totalFile += 1;
      await storage.save();
    }

    return ApiResponse.send('File stored successfully' , {storage});
  } catch (error) {
    console.error('Error in file processing:', error);
    return ApiError.send('An error occurred while processing the request');
  }
};
