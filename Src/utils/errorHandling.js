

export const asyncHandler=(API)=>{
    return(req,res,next)=>{
    API(req,res,next).catch((err)=>{
            console.log(err)
            console.log("Fail")
          return res.status(500).json({message:"fail" } )
        })  
    }
}