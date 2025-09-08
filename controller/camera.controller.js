const Camera = require("../modals/camera.model");

exports.RegisterCamera = async (req, res) => {
  const { cameraName, cameraId, cameraType, location, exactLocation, userName } = req.body;
  console.log("Incoming data:", cameraName, cameraId, cameraType, location, exactLocation, userName);

  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    // Check if camera already exists
    const existingCamera = await Camera.findOne({ cameraId });
    if (existingCamera) {
      return res.status(400).json({
        message: "Camera already registered",
      });
    }

    // Create new camera
    const newCamera = new Camera({
      cameraName,
      cameraId,
      cameraType,
      location,
      exactLocation,
      userName,
      user: userId,
    });

    await newCamera.save();

    res.status(201).json({
      message: "Camera registered successfully",
      camera: newCamera,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.findallCamera = async (req, res) => {
  try {
    const allcamera = await Camera.find().populate("user", "userName loginId");
    return res.status(200).json({
      message: "Fetch All Camera Successfully",
      allcamera: allcamera
    })


  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
exports.getCameraById = async (req, res) => {
  try {
    const { cameraName } = req.params; // ✅ correctly extract cameraId

    const cameradetailbyid = await Camera.findOne({ cameraName })
      .populate("user", "userName loginId");

    if (!cameradetailbyid) {
      return res.status(404).json({
        message: "Camera details not found",
      });
    }

    return res.status(200).json({
      message: "Camera details found successfully",
      camera: cameradetailbyid,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
exports.getallcameraforregistereduser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    
    // Find all cameras where user matches userId
    const registerdcamerabyuserId = await Camera.find({ user: userId }).select("cameraName cameraId cameraType location exactLocation userName");
    
    res.status(200).json({
      message: "Data found successfully",
      cameras: registerdcamerabyuserId
    });

  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


exports.howmanycameraregisterparticulruserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const findallcameraperuserid = await Camera.find({ user: userId }).populate("user", "userName loginId");
    if (!findallcameraperuserid) {
      return res.status(400).json({
        message: "no camera found for that camera"
      })
    }
    return res.status(200).json({
      message: "Cameras fetch corresponding users",
      findallcameraperuserid: findallcameraperuserid
    })
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
exports.updateparticulrcamera = async (req, res) => {
  try {

  } catch (error) {

  }
}