const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        Caption:{
            type:String,
            required:true,
            maxLength:50
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
        Likes: [{
            type:mongoose.Schema.Types.ObjectId,
            ref :"Like"
        }],
        Comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref :"Comment"
        }]
    }
)

module.exports = mongoose.model("Posts" , PostSchema);