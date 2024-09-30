const { Schema, models, model } = require("mongoose");


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
        minLength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    isVerify:{
       type:Boolean,
       default:false
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

export const Users = models.user || model("User" , userModel)