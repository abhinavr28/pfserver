require('dotenv').config();

const express =require("express");
const cors=require("cors");
const router=require("./Router/router")
require('./DB/connection')

// creating a express server
const pfserver=express()


pfserver.use(cors())

// parse json


pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

pfserver.listen(PORT,()=>{

    console.log(`your server is started on port:${PORT},and waiting for the client request`)

})

pfserver.get('/',(req,res)=>{

    res.send("hey hello world")
})
