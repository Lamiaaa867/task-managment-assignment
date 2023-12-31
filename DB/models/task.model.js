import mongoose from "mongoose";
import { Schema } from "mongoose";
const taskSchema=new Schema({
    title:{
        type:String,
        required:true,   
        unique:true
    },
    description:{
        type :String,
        required:true,
      },  
      deadline:{
        type :Date,
        required:true,        
      },
      status:{
       type:String,
       enum:['toDo','completed','in progress'],
       default:'toDo'
      },
     userid:{
      type:Schema.Types.ObjectId,
      ref:'user',
     
     },
     assignTo:{
      type:Schema.Types.ObjectId,
      ref:'user',
      unique:false
      
     },
    },{
        timestamps:true
    }

)
export const taskModel=mongoose.model('task',taskSchema)