const express=require("express");
const router=express.Router();
const CameraController=require("../controller/camera.controller");
const auth=require("../middleware/authmiddleware")
router.post("/create",auth,CameraController.RegisterCamera);
router.get("/camera/:cameraName",auth,CameraController.getCameraById);
router.get("/cameraall",auth,CameraController.getallcameraforregistereduser)

module.exports=router;