const mongoose =  require('mongoose');

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

module.exports = mongoose.model("File" , FileSchema);