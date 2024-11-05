const Posts = require("../Models/PostModel");
const Comment = require("../Models/CommentModel");

exports.CreateComment = async(req,res) =>{
    try{
        const { Post , user , Description } = req.body;

        const comment = new Comment({
            Post , user ,Description
        });

        const savedComment = await comment.save();

        //find the post by id
        const updatedPost = await Posts.findByIdAndUpdate( Post , {$push: {Comments :savedComment._id}} , {new:true})
                             .populate("Comments")
                             .exec();
                              
        res.status(200).json({
            success:true,
            Post:updatedPost,
            message:"Commented Succesfully",
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


