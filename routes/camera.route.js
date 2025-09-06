const express=require("express");
const router=express.Router();
const CameraController=require("../controller/camera.controller")
router.post("/create",CameraController.RegsiterCamera);

module.exports=router;