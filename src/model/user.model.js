import  { Schema, models, model } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userModel = new Schema({
    userName:{
        type:String,
        reduired:[true , "username must be required "],
        unique:true,
        minLength:[6 , "username must be 6 charecter or more"],
        trim:true
    },
    fullName :{
        type:String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please provide a valid email address'
        ],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long'],
        
    },
    profile_pic:{
            url:{
                type:String,
                default:'https://res.cloudinary.com/dab0ekhmy/image/upload/v1728130610/thik-ai/gvjpvq3xljmnw2vwdkag.avif'
            },
            public_id:{
                type:String,
                default:null
            }
        }
    ,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    isVerify:{
       type:Boolean,
       default:false
    },

    isTwoStepAuth:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number
    },
    otpExpiary:{
        type:Date
    },
    createWith:{
       type:String,
       default:"emailAndPassword"
    },

    isFree:{
      type:Boolean,
      default:true 
    },

    isPrimeMember:{
       type:Boolean,
       default:false
    },
    
    verifyToken: String,
    verifyTokenEpiary:Date,
    forgotToken:String,
    forgotTokenExpiary:Date
    
} , {timestamps:true})



// token genarate 
userModel.methods.generateToken =function () {
    const token =  jwt.sign(
        { id:this._id , email:this.email , userName: this.userName},
        process.env.JWT_SECRET,
        { expiresIn: '10d' } // Token expiry time
    )
    return token;
}

// Password encryption 
userModel.pre('save', async function (next) {
    if (this.isModified('password')) { // Check if password has been modified
        if (this.password) { // Ensure password exists
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (error) {
                return next(error);
            }
        }
    }
    next(); // Continue with the save operation
});

// compare password method 
userModel.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password);
}


export const Users = models.User || model("User" , userModel)