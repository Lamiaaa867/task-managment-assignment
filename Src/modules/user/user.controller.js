import { userModel } from "../../../DB/models/user.model.js";
import { taskModel } from "../../../DB/models/task.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemon from "nodemon";


//===================Sign UP====================
export const signUp=async(req,res,next)=>{
const {
    username,
    email,
    password,
    copyPassword,
    gender,
    age,
    phone,}=req.body;
    const userExit= await userModel.findOne({email})
    if(userExit){
        return res.status(400).json({message:"email is already exist"})
    }
    if(password!==copyPassword){
        return res.status(402).json({message:"the password doesn,t match"})
    }
    const hashedPassword=bcrypt.hashSync(password,+process.env.salt_level)
   
    const userinstance= new userModel({  username,
        email,       
       password:hashedPassword,
        gender,
        age,
        phone})
        await userinstance.save();
       
        return res.status(200).json({message:"user added successfully",userinstance})
    
}
//==================log in ======================

export const login=async(req,res,next)=>{
    const{email ,password}=req.body
    const userExit= await userModel.findOne({email})
    if(!userExit){
        return res.status(400).json({message:"email dowsn,t exist , please sign up first or enter a valid email"})
    }

    const passwordMatch=bcrypt.compareSync(password , userExit.password)
    if(!passwordMatch){
        return res.status(400).json({message:"wrong password enter correct password please"})
    }
    const userlogged=await userModel.findOneAndUpdate({email},{
        is_online:true
    },{new:true})
    const userToken=jwt.sign({
        email,
        id:userExit._id,
        loggedin:userExit.is_online,
        username:userExit.username,
        age:userExit.age}
         ,process.env.tokenSecretKey)
   
   // userExit.is_online=true;

    return res.status(200).json({message:"log in successfully",userToken,userExit})   

}
//====================log out=================================
export const logOut=async(req,res,next)=>{
    const {id}=req.auth;
    const{_id}=req.query;
    const userExist=await userModel.findOne({_id});
    if (!userExist){
        return res.status(400).json({message:"in valid user id"})
    }
    if (userExist._id.toString()!==id){
        return res.status(400).json({message:"un outhorized"})
    }   
    const updatedUser = await userModel.findByIdAndUpdate({_id}, { is_online: false },
       {new:true} );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User logged out' ,updatedUser});
}