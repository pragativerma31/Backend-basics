const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,res,next) =>{
    try{
        //extract jwt token

        const token  = req.cookies.token ;
        // .replace("Bearer " ,"")
        // || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", "").trim());
        if(!token) {
            return res.status(400).json({
                success: false,
                message : "Token missing"
            })  
        }

        //verify the token
        try{
            const decode  = JWT.verify(token , process.env.JWT_Secret);
            console.log(decode);
            req.User = decode;
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message : "Token Invalid"
            }) 
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message : "something went wrong",
        })
    }
    
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.User.role !== "student"){
            return res.status(401).json({
                success: false,
                message : "Protected routes for student"
            }) 
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message : "something went wrong in is student "
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.User.role !== "admin"){
            return res.status(401).json({
                success: false,
                message : "Protected routes for student"
            }) 
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message : "something went wrong in is admin "
        })
    }
}