import mongoose, { model, models, Schema } from "mongoose";

// Sub-schema for storing individual PDF details
const PdfSchema = new Schema({
    name: {
        type: String,
        required: [true, "PDF name is required"], 
        trim: true, 
    },
    url: {
        type: String,
        required: [true, "PDF URL is required"],
    },
    public_id: {
        type: String,
        required: [true, "Public ID is required"],
    }
}, { _id: false }); // Disable _id for the sub-schema to avoid extra ids


const storageModel = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User not found!"],
        index: true, // Index for faster queries by user_id
    },
    pdfs: [PdfSchema], 
    
    totalPdf:{
        type:Number,
        default:0
    }
}, { timestamps: true }); 


export const Storage = models.Storage || model('Storage', storageModel);
