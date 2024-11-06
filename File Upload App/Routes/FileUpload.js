const express = require('express');
const { LocalFileUpload, Imageupload, VideoUpload, ReducedImageupload } = require('../controllers/fileUpload');
const router = express.Router();

router.post("/LocalFileUpload" , LocalFileUpload);
router.post("/imageUpload" , Imageupload);
router.post("/videoUpload" , VideoUpload);
router.post("/ReducedImageUpload" , ReducedImageupload);

module.exports =  router;
