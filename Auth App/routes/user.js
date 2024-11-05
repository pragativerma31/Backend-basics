const express = require('express');
const { SignUp, LoginIn } = require('../controllers/Auth');
const { auth, isStudent, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/signup' , SignUp);
router.get('/login' ,LoginIn);

router.get('/test' , auth , (req,res)=>{
    return res.status(200).json({
        success: true,
        message : "Welcome to protected route "
    })
});
router.get('/student' , auth , isStudent , (req,res) =>{
    return res.status(200).json({
        success: true,
        message : "Welcome to protected route for students"
    })
}) ;

router.get('/admin' , auth , isAdmin , (req,res) =>{
    return res.status(200).json({
        success: true,
        message : "Welcome to protected route for admin"
    })
}) ;

module.exports = router;