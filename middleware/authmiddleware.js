
const jwt=require('jsonwebtoken');
const authMiddleware=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    console.log(token)
    if(!token) return res.status(401).json({
        message:"No Token Provided"
    })
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("req.user",req.user)
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}
module.exports=authMiddleware;