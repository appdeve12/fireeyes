const User=require("../modals/user.modals");
const bcryptjs=require("bcrypt");
const jwt=require("jsonwebtoken")
module.exports.RegisterUser=async(req,res)=>{
    try{
const {userName,loginId,password}=req.body;
const UserExist=await User.findOne({loginId:loginId});
if(UserExist){
    return res.status(400).json({
        message:"User Alreday exist"
    })
}
console.log(UserExist)
const decodepassword=await bcryptjs.hash(password,10);
console.log("decodepassword",decodepassword);
const createuser=new User({
    userName,
    loginId,
    password:decodepassword
})
await createuser.save();
   return res.status(201).json({messgae:"user register sucessfully",
   user: createuser})
    }catch(error){
      return res.status(500).json({ message: error.message })
    }
    
}
module.exports.LoginUser=async(req,res)=>{
    try{
        const {loginId,password}=req.body;
        const userchecked=await User.findOne({loginId:loginId})
        if(!userchecked){
            return res.status(400).json({
                message:"Invalid Cridentilas"
            })
        }
        const camparepassword=await bcryptjs.compare(password,userchecked.password);
        if(!camparepassword){
            return res.status(400).json("Password is Invalid")
        }
const token=jwt.sign({id:userchecked._id,role:userchecked.role},process.env.JWT_SECRET,{expiresIn:"40d"});
console.log("token",token);
return res.status(200).json({message:"Login Successfully",user:userchecked,token:token})
    }catch(error){
 return res.status(500).json({ message: error.message })
    }
}