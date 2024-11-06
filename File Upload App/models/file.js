const mongoose =  require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');

const FileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    fileURL:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
})

FileSchema.post("save" , async function (doc) {
    try{
        console.log("entry saved" , doc)

        //transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        let info = await transporter.sendMail({
            from:`File Upload app`,
            to: doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>FILE UPLOADED</h2>`
        })
    }
    catch(err){
        console.log(err);
    }
    
})

module.exports = mongoose.model("File" , FileSchema);