import mongoose, { model, models, Schema } from "mongoose";

// Sub-schema for storing individual PDF details
const fileSchema = new Schema({
    name: {
        type: String,
        required: [true, "file name is required"], 
        trim: true, 
    },
    url: {
        type: String,
        required: [true, "file URL is required"],
    },
    public_id: {
        type: String,
        required: [true, "Public ID is required"],
    }
}, { _id: false }); // Disable _id for the sub-schema to avoid extra ids


const storageModel = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User not found!"],
        index: true, // Index for faster queries by user_id
    },
    files: [fileSchema], 
    
    totalFile:{
        type:Number,
        default:0
    }
}, { timestamps: true }); 


export const Storages = models.Storages || model('Storages', storageModel);
