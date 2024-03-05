const User=require("../models/user.js");
const jwt=require("jsonwebtoken");

module.exports.isAuthenticated =async (req,res,next)=>{

    const { token }=req.cookies;

    if (!token) 
        return res.status(404).json({
            success:false,
            meassage:"Login fast",
        });
    const decoded=jwt.verify(token, process.env.JWT_SECRET); 
    
    req.user=await User.findById(decoded._id);
    next();
};