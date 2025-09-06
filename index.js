const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const cors=require("cors");
const app=express();
app.use(express.json());
dotenv.config()
app.use(cors())
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DataBase Connected")).catch(()=>console.log('Database Not Connected'))
const UserRoute=require("./routes/user.route");
const CameraRoute=require("./routes/camera.route")
app.use("/api/user",UserRoute)
app.use("/api/camera",CameraRoute)
app.listen(process.env.PORT,()=>console.log(`Server is connected on the follwong ${process.env.PORT}`))