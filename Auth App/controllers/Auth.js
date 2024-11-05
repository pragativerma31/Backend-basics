const bcrypt = require('bcrypt');
const User = require('../model/User');
const JWT = require('jsonwebtoken');
require('dotenv').config();

exports.SignUp = async(req,res) => {
    try{
        //get data
        const {name , email , password , role} = req.body;
        //check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message : "User already exists"
            })
        }
        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message : "Error in Hashing"
            }) 
        }
        const user = await User.create({
            name , email , password:hashedpassword , role
        })
        return res.status(200).json({
            success: true,
            message : "User created successfully"
        }) 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message : "Error in Creating , Please try again after sometime"
        })
    }
}
exports.LoginIn = async(req,res) => {
    try{
        //get data
        const {email , password} = req.body;

        //validity
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "Fill all the details"
            })
        }
        //check if user already exists
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                success: false,
                message : "Sign Up First"
            })
        }

        const validity = await bcrypt.compare(password,existingUser.password);
        const payload = {
            email:existingUser.email,
            id:existingUser._id,
            role:existingUser.role,
        };

        if(validity){
            let token = JWT.sign(payload,
                process.env.JWT_Secret,
                {
                    expiresIn:"2h",
                }
            );
            existingUser.token= token;
            await existingUser.save();

            existingUser.password = "undefined";

            const options = {
                expires : new Date(Date.now() + 3*10000),
                httpOnly: true,
            }

            res.cookie("token" , token , options).status(200).json({
                success: true,
                existingUser,
                message : "Loginned Successfully"
            })
            // res.status(200).json({
            //     success: true,
            //     existingUser,
            //     message : "Loginned Successfully"
            // })
        }
        else{
            return res.status(401).json({
                success: false,
                message : "Wrong Password"
            }) 
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message : "Error in Creating , Please try again after sometime"
        })
    }
}

