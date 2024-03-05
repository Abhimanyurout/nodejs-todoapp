const User=require("../models/user.js");
const bcrypt = require('bcrypt');
const { sendCookie } = require("../utils/features.js");
const { now } = require("mongoose");
const ErrorHandler = require("../middlewares/error.js");



module.exports.login=async(req,res,next)=>{
   try {
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid Email or Password",404));

    const isMatch=await bcrypt.compare(password,user.password);  
    
    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",404));
    sendCookie(user,res,`Welcome back ,${user.name}`,200);
   } catch (error) {
     next(error);
   }
},

module.exports.register=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        let user=await User.findOne({email});

        if(user) return next(new ErrorHandler("User already exits",404));
   
        const hashedPassword=await bcrypt.hash(password,10);
        user=await User.create({name,email,password:hashedPassword});

        sendCookie(user,res,"User Register successfully",201);
    } catch (error) {
        next(error);
    }  
};


module.exports.getMyProfile= (req,res)=>{
    try {
        res.status(200).json({
            success:true,
            user:req.user,   
        });
    } catch (error) {
        next(error);
    }
};

module.exports.logout=(req,res)=>{
    try {
        res.status(200)
        .cookie("token","", {
            expires:new Date(Date.now()),
            sameSite:process.env.NODE_ENV==="Development"? "lax":"none",
            secure:process.env.NODE_ENV==="Development"? false: true,
        })
        .json({
            success:true,
            user:req.user,   
    });
    } catch (error) {
        next(error);
    }
}
