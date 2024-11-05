const Posts = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");
const Like = require("../Models/LikeModel");

exports.CreatePost = async(req,res) =>{
    try{
        const {Caption , Description} =req.body;
        //create a new todo obj and insert in DB
        const createdPost = await Posts.create({Caption , Description });

        res.status(200).json({
            success:true,
            Post:createdPost,
            message:"Post Created Successfully",
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

exports.GetAllPosts = async(req,res) =>{
    try{
        const AllPosts = await Posts.find().populate("Comments").populate("Likes").exec();

        res.status(200).json({
            success:true,
            Posts: AllPosts,
            message:"All Posts retreived",
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