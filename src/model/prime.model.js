import mongoose, { model, models, Schema } from "mongoose"


const offerShema = new Schema({
    pdf:{
        exist:{
            type:Number,
            default:10
        },
        capacity:{
            type:Number,
            default:10
        }
    },
    video:{
        exist:{
            type:Number,
            default:10
        },
        capacity:{
            type:Number,
            default:10
        }
    },
    image:{
        exist:{
            type:Number,
            default:10
        },
        capacity:{
            type:Number,
            default:10
        }
    },
    code:{
        exist:{
            type:Number,
            default:10
        },
        capacity:{
            type:Number,
            default:10
        }
    }
} , {_id: false})

const primeSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true , "user not found !"]
    },
    primeType:{
        type:"string",
        required:[true , "prime type required"],
        enum:['free' , 'basic' , 'pro' , 'enterprise']
    },
    primeStart:{
        type:Date,
        required:true,
        default:Date.now()
    },
    primeExpire:{
        type:Date,
        required:true,
        default:Date.now()
    },
    offers: offerShema ,
    discount :{
        type:Number,
        default:0
    },
    ammount:{
       type:Number,
       default:0
    }

}, {timestamps:true})

export const Primes = models.Prime || model('Prime' , primeSchema)