
const { register,login, getMyProfile, logout } = require("../controllers/user.js");
const express = require('express');
const { isAuthenticated } = require("../middlewares/auth.js");
const router=express.Router();


router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);


router.get("/me",isAuthenticated, getMyProfile);


module.exports= router;