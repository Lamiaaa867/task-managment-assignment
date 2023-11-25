import { connectionDB } from "../../DB/conecctionDB.js"

import * as allrouters from '../modules/index.routes.js'
export const iniateApp=(app,express)=>{
    const port =process.env.port
    connectionDB();
    app.use(express.json())
   
    app.use('/user',allrouters.userrouter)
    app.use('/task',allrouters.taskrouter)
    app.all('*',(req,res,next)=>
    res.status(404).json('URL NOT FOUND')
    )


    app.listen(port,(req,res,next)=>{
        console.log(`app lisening on ${port}`)
        })
}