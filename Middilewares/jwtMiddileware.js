const jwt = require('jsonwebtoken')

const jwtMiddileware = (req,res,next)=>{
    console.log("inside jwtMiddileware fn");
    try{
        const token = req.headers['authorization'].split(" ")[1]
        console.log(token);
        if(token){
            jwtResponse=jwt.verify(token,process.env.JWT_SECRET)
            console.log(jwtResponse);
            req.payload=jwtResponse.userId
            next()
        }else{
            res.status(401).json("invalid token")
        }
    }catch{
        res.status(400).json("please login")
    }
}



module.exports= jwtMiddileware