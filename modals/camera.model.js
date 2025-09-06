const mongoose=require("mongoose");
const CameraSchema = new mongoose.Schema({
    cameraName: { type: String, required: true },
    cameraId: { type: String, required: "true", unique: true },
    cameraType: { type: String, enum: ["ipcamera"] },
    location: { type: String, required: true },
    exactLocation: { type: String, required: true },
    userName: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})
module.exports=mongoose.model("camera",CameraSchema)
