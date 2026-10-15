const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const Blacklist=require('../models/blacklist.model');

async function authUser(req,res,next){
    const token=req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }
    const BlackListToken=await Blacklist.findOne({token:token});
    if(BlackListToken){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(401).json({

            message:"Invalid token"
        })

    }
    
    
}

module.exports={authUser};