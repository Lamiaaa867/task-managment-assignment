import { userModel } from "../../../DB/models/user.model.js";
import { taskModel } from "../../../DB/models/task.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//====================add task ================================
export const addTask=async(req,res,next)=>{
    const {id}=req.auth
    const {userid}=req.query
    const {title,description,status,deadline,assignTo}=req.body;
    const task=await taskModel.findOne({title});
    if (task){
        return res.status(401).json({message:"task already exist "})
   }
  if (userid.toString()!==id.toString()){
        return res.status(401).json({message:"please enter valid id"}) 
    }
    
   const userexist=await userModel.findById(assignTo)
   if(!userexist){
    return res.status(401).json({message:"user isn,t exist , cant assign tasks "})
   }

    const taskInstance=new taskModel({title,description,status,deadline,userid,assignTo})
    taskInstance.save()
    return res.status(200).json({message:"task added",taskInstance})
   
   
}
//=========================update task==================
export const updateTask=async(req,res,next)=>{
    const {id}=req.auth;
    const {userid}=req.query;
    const {_id}=req.query
    const {title,description,status,deadline}=req.body;
    const task=await taskModel.findById(_id);
    if (!task){
        return res.status(401).json({message:"invalid task"})
    }
    if (userid!==id.toString()){
        return res.status(401).json({message:"please enter valid id"}) 
    }
    const newTask=await taskModel.findByIdAndUpdate({_id},
        {title,description,status,deadline},
        {new:true})
        return res.status(200).json({message:"task updated",newTask}) 
    }
    //===========================delete task===================
export const deleteTask=async(req,res,next)=>{
    const {id}=req.auth;
    const {userid}=req.query;
    const {_id}=req.query
   // const {title,description,status,deadline}=req.body;
    const task=await taskModel.findById(_id);
    if (!task){
        return res.status(401).json({message:"invalid task"})
    }
    if (userid!==id.toString()){
        return res.status(401).json({message:"please enter valid id"}) 
    }
    const deletedTask=await taskModel.findByIdAndDelete({_id},
        {new:true})
        return res.status(200).json({message:"task deleted",deletedTask}) 

}
//================== find selected task by id============
export const getSelectedTask=async(req,res,next)=>{
    const {id}=req.auth;
    const {userid}=req.query;
    const {_id}=req.query
    
    const task=await taskModel.findById(_id);
    if (!task){
        return res.status(401).json({message:"invalid task"})
    }
    if (userid!==id.toString()){
        return res.status(401).json({message:"please enter valid id"}) 
    }
    const selectedTask=await taskModel.findById({_id})
        return res.status(200).json({message:"task updated",selectedTask}) 
    }
    //==========================get all tasks =========================

    export const getallTask=async(req,res,next)=>{
        const {id}=req.auth;
        const {userid}=req.query;
       
        if (userid!==id.toString()){
            return res.status(401).json({message:"please enter valid id"}) 
        }
        const allTask=await taskModel.find()
            return res.status(200).json({message:"tasks",allTask}) 
        }
        //===================
        export const deadlineTask=async(req,res,next)=>{
            const sevenDaysAgo = new Date();
            const tasks =await taskModel.find({deadline:{$lt:sevenDaysAgo}, status:{$ne:'toDo '} ,status: {$ne:'in progress'}})
            if(!tasks){
                return res.status(400).json({message:"no tasks"})
            }
            return res.status(200).json({message:"done",tasks})
            }
