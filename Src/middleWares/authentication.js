import jwt  from "jsonwebtoken";
import { userModel } from "../../DB/models/user.model.js";
export const isAuthentcated=()=>{
    return async(req,res,next)=>{
        const {authorization}=req.headers;
        if(!authorization){
            return res.status(400).json({message:"please log in first"})
        }
        if(!authorization.startsWith('user')){
            return res.status(400).json({message:"invalid prefix"})
        }
        const splitToken= authorization.split(' ')[1];
        const decodedData=jwt.verify(splitToken,process.env.tokenSecretKey)
        if(!decodedData||!decodedData.id){
            return res.status(400).json({message:"enter valid token"})   
        }
        if (!decodedData.loggedin){
            return res.status(400).json({message:"please log in first"})
        }
        const finduser=await userModel.findById(decodedData.id)
        if(!finduser){
            return res.status(400).json({message:"sign up first"})
        }
        req.auth=finduser
        next();
    }
}