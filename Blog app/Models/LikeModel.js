const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        Post:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        user:{
            type:String,
            required:true,
            maxLength:50,
        }
    }
)

module.exports = mongoose.model("Like" , LikeSchema);