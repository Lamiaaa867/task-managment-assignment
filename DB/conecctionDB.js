
import mongoose from "mongoose";
export const connectionDB=async()=>{
    return await mongoose 
    .connect(process.env.connection_url)
    .then((res)=>{console.log("conncted to  DB")},)
    .catch((err)=>{console.log("fail to connect to trello DB",err)})
}