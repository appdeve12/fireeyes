const mongoose=require("mongoose");
const userScema=new mongoose.Schema({
    userName:{type:String,required:true},
    loginId:{type:String,required:true,unique:true},
    password:{type:String,required:true,min:6},
    role:{type:String,enum:["user","admin"],default:"user"},
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model("user",userScema)