const Camera =require("../modals/camera.model");
exports.RegsiterCamera=async(req,res)=>{
    const {cameraName,cameraId,cameraType,location,exactLocation,userName}=req.body;
    try{
const userId=req.user.id;
const cameraRegister=await Camera.find({cameraId:cameraId})
if(cameraRegister){
    return res.status(400).json({
        message:"Camera already register"
    })
}
const cameradata=new Camera({
    cameraName,cameraId,cameraType,location,exactLocation,userName,user:userId
})
await cameradata.save();
res.status(201).json({
    message:"Camera Register Successfully",
    camera:cameradata
})

    }catch(error){
console.error("Internal server error",error);
res.status(500).json({
    message:"Internal Server Error"
})
    }
}
exports.findallCamera=async(req,res)=>{
    try{
        const allcamera=await Camera.find().populate("user","userName loginId");
        return res.status(200).json({
            message:"Fetch All Camera Successfully",
            allcamera:allcamera
        })


    }catch(error){
        console.error("Internal server error",error);
res.status(500).json({
    message:"Internal Server Error"
})
    }
}
exports.cameracameraId=async(req,res)=>{
    try{
        const cameraId=req.params
        const cameradetailbyid=await Camera.findOne({cameraId:cameraId}).populate("user","userName loginId");
        if(!cameradetailbyid){
            return res.status(400).json({
                message:"camersa details not found"
            })
        }
return res.status(200).json({
    message:"camera deatils found succesfully",
    cameradetailbyid:cameradetailbyid
})
    }catch(error){
                console.error("Internal server error",error);
res.status(500).json({
    message:"Internal Server Error"
})
    }
}
exports.howmanycameraregisterparticulruserId=async(req,res)=>{
    try{
const userId=req.user.id;
const findallcameraperuserid=await Camera.find({user:userId}).populate("user","userName loginId");
if(!findallcameraperuserid){
    return res.status(400).json({
        message:"no camera found for that camera"
    })
}
return res.status(200).json({
    message:"Cameras fetch corresponding users",
    findallcameraperuserid:findallcameraperuserid
})
    }catch(error){
                        console.error("Internal server error",error);   
res.status(500).json({
    message:"Internal Server Error"
})
    }
}
exports.updateparticulrcamera=async(req,res)=>{
    try{

    }catch(error){

    }
}