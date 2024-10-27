import mongoose, { model, models, Schema } from "mongoose";


const storageModel = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User not found!"],
    },
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
}, { timestamps: true }); 


export const Storages = models.Storages || model('Storages', storageModel);
