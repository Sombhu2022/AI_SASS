import mongoose from "mongoose";

let isConnect = false
export const dbConnect = async()=>{

    if(isConnect){
        console.info("data base already connected");
        return
    }

    if (!process.env.DB_URL) {
        console.error("DB_URL is not defined in environment variables");
        throw new Error("Missing DB_URL environment variable");
      }

    try {

        await mongoose.connect(process.env.DB_URL)
        console.info("data base connected successfully");
        isConnect = true

    } catch (error) {
        console.error("data base not connected ", error);
        process.exit()
    }

}