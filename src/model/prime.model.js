import mongoose, { model, models, Schema } from "mongoose"


const offerShema = new Schema({
    pdf:{
        type:Number,
        default:0
    },
    video:{
        type:Number,
        default:0
    },
    image:{
        type:Number,
        default:0
    }
} , {_id: false})

const primeSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true , "user not found !"]
    },
    prime_type:{
        type:"string",
        required:[true , "prime type required"],
        enum:["monthly" , "yearly", "sixMonth"]
    },
    prime_start:{
        type:Date,
        required:true
    },
    prime_expire:{
        type:Date,
        required:true
    },
    offers:[ offerShema ]

}, {timestamps:true})

export const Primes = models.Prime || model('Prime' , primeSchema)