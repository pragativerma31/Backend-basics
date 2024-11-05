const express = require('express');
const router = express.Router();

//controller import
const {dummyPage} = require('../controllers/dummyPage');
const {CreateComment} =require("../controllers/CommentController");
const {CreatePost ,GetAllPosts} =require("../controllers/PostController");
const {PostLiked , PostUnliked} =require("../controllers/LikeController");


//define route
router.get("/dummyPage" , dummyPage);
router.get("/AllPosts/Show" , GetAllPosts);
router.get("/post/unliked" ,PostUnliked);

router.post("/comment/create" , CreateComment);
router.post("/posts/create" ,CreatePost);
router.post("/post/liked" , PostLiked);


// export

module.exports = router;