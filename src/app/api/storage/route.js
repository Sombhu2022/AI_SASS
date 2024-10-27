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

    // 4. upload markdown data
    const { url, public_id, error } = await bufferFileUploader(Buffer.from(markdownData, 'utf-8'));
    if (error) {
      return ApiError.send('Error during file upload to Cloudinary');
    }

    // 8. Save file URL to storage table
    const storage = await Storages.create({
      userId,
      url,
      public_id,
      name: fileName

    });


    return ApiResponse.send('File stored successfully', { storage });
  } catch (error) {
    console.error('Error in file processing:', error);
    return ApiError.send('An error occurred while processing the request');
  }
};


export const GET = async (res) => {

  try {
    // 1. DB connection
    await dbConnect();

    // 2. User validation
    const userId = getUserDetails();
    if (!userId) return ApiError.send('User not authenticated');

    //  3.storage find 
    const data = await Storages.find({ userId })
    if (!data) {
      return ApiError.send('Storage is fully Empty !')
    }

    return ApiResponse.send('storage data are successfully fetched !', { data })

  } catch (error) {
    return ApiError.send()
  }

}