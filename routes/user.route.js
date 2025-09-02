const express=require("express");
const router=express.Router();
const UserController=require("../controller/user.controller")
router.post("/create",UserController.RegisterUser);
router.post("/login",UserController.LoginUser)
module.exports=router;