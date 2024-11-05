const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        Post:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Posts",
        },
        Description:{
            type:String,
            required:true,
            maxLength:200
        },
        PostedAt:{
            type:Date,
            required:true,
            default:Date.now,
        },
        user:{
            type:String,
            required:true,
            maxLength:50,
        }
    }
)

module.exports = mongoose.model("Comment" , CommentSchema);