const Posts = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");
const Like = require("../Models/LikeModel")

exports.PostLiked = async(req,res) =>{
    try{
        const { Post , user  } = req.body;

        const like = new Like({
            Post , user 
        });

        const Liked = await like.save();

        //find the post by id
        const updatedPost = await Posts.findByIdAndUpdate( Post , {$push: {Likes :Liked._id}} , {new:true})
                             .populate("Likes")
                             .exec();
                              
        res.status(200).json({
            success:true,
            Post:updatedPost,
            message:"Liked Succesfully",
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}

exports.PostUnliked = async(req,res) =>{
    try{

        const {Post , likeId } = req.body; 
        //find the post by id
        const updatedPost = await Posts.findByIdAndUpdate( Post , {$pull: {Likes :likeId}} , {new:true})
                             .populate("Likes")
                             .exec();

        await Like.findByIdAndDelete(likeId);
                              
        res.status(200).json({
            success:true,
            Post:updatedPost,
            message:"UnLiked Succesfully",
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}

