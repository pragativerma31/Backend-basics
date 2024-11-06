const File = require('../models/file');
const cloudinary = require('cloudinary').v2;

function isFileTypeSupported(supported , fileType){
    return supported.includes(fileType);
}

async  function uploadImgToCloudinary(file , folder , quality){
    const options = {folder}
    if(quality){
        options.quality = quality ;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

async  function uploadVideoToCloudinary(file , folder){
    return await cloudinary.uploader.upload(file.tempFilePath,{
        resource_type :"video",
        folder:folder
    });
}

exports.LocalFileUpload = async(req,res) => {
    try{
        const file =  req.files.file ;
        console.log(file);

        let path = __dirname + "/files/" + Date.now() + `.`+ `${file.name.split('.')[1]}`;
        file.mv(path , (err) => {
            console.log(err);
        } );

        res.json({
            success:true,
            message:"file uploaded locally"
        })
    }
    catch(err){
        console.log(err);
    }
}


exports.Imageupload = async(req,res) => {
    try{
        const { name , email , tags } = req.body ; 
        console.log(name, tags , email);

        const file  = req.files.imageFile ; 
        console.log(file);

        const supported = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        const isSupported  = isFileTypeSupported(supported , fileType);

        if(!isSupported){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await uploadImgToCloudinary(file , "Files");
        console.log(response);

        //entry in db
        const filedata = await File.create({
            name,
            tags,
            email,
            fileURL:response.secure_url
        })

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"File uploaded successfully"
        })



    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

    }
}

exports.VideoUpload = async(req,res) => {
    try{
        const { name , email , tags  } = req.body ; 
        console.log(name, tags , email);

        const file  = req.files.VideoFile ; 
        console.log(file);

        const supported = ["mp4" , "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        const isSupported  = isFileTypeSupported(supported , fileType);

        if(!isSupported){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
            return res.status(400).json({
                success: false,
                message: "File size exceeds the 5MB limit"
            });
        }

        const response = await uploadVideoToCloudinary(file , "Files");
        console.log(response);

        //entry in db
        const filedata = await File.create({
            name,
            tags,
            email,
            fileURL:response.secure_url
        })

        res.status(200).json({
            success:true,
            videoURL:response.secure_url,
            message:"File uploaded successfully"
        })



    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

    }
}
exports.ReducedImageupload = async(req,res) => {
    try{
        const { name , email , tags , quality } = req.body ; 
        console.log(name, tags , email);

        const file  = req.files.imageFile ; 
        console.log(file);

        const supported = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        const isSupported  = isFileTypeSupported(supported , fileType);

        if(!isSupported){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await uploadImgToCloudinary(file , "Files", quality);
        console.log(response);

        //entry in db
        const filedata = await File.create({
            name,
            tags,
            email,
            fileURL:response.secure_url
        })

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            size:response.bytes ,
            message:"File uploaded successfully"
        })



    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

    }
}