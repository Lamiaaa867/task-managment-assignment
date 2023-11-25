import mongoose from "mongoose";
import { Schema } from "mongoose";

 const userSchema= new Schema({

    username:{
        type:String,
        required :true,
        lowercase:true,
    },
    email:{
        type: String,
        unique:true,
    },
is_online:{
    type:Boolean,
    default:false
},

  password:{
        type:String,
        required :true,
    },
    gender:{
     type:String,
    enum: ['male','female','not specified'],
    },
    age:{
        type:Number,
        required :true,
    },
    phone:{
        type:Number,
        required :true,
        unique:true
    },
    
},{
    timestamps:true,
})
export const userModel=mongoose.model('user',userSchema)