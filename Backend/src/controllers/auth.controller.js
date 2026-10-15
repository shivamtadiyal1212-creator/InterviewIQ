const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie=require('cookie-parser');
const Blacklist=require('../models/blacklist.model');
/**
 * @name registorUserController
 * @description Registor a new user, expects userName ,email and password in body
 * @acess Public
 */
async function registorUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All the fields are required",
    });
  }
  const UserEmailExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (UserEmailExist) {
    res.status(400).json({
      message: "Account already exist with this email or username",
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const User = await userModel.create({
    username: username,
    email: email,
    password: passwordHash,
  });
  const token = jwt.sign(
    { id: User._id, username: User.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

  res.status(201).json({
    message: "User registor successfully",
    User
  });
}

/**
 * @name loginUser
 * @description Login a user, expects email and password in body
 * @acess Public
 */
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const User = await userModel.findOne({email}).select("+password");

  if(!User){
    return res.status(404).json({
        message:"No Account found with that user"
    })
  }
  const comparePassword=await bcrypt.compare(password,User.password);
  if(!comparePassword){
    return res.status(401).json({
        message:"Invalid credintial"
    })
  }
  const token=jwt.sign(
    { id: User._id, username: User.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  )
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
  res.status(200).json({
    message:"Login successfully",
    User:{
        id:User._id,
        username:User.username,
        email:User.email
    }
  })
}


/**
 * @name logout
 * @description clear token from user cokkie and add the token in blacklist
 * @access public
 */
async function logout(req,res){
  const token=req.cookies.token;
 
  if(!token){
    return res.status(401).json({
      message:"no token found"
    })
  }
  const addTokenToBlacklist=await Blacklist.create({token});
  res.clearCookie("token");
  return res.status(200).json({
    message:"Logout successfully"
  })


}

/**
 * @name getMe
 * @description get the current logged in user details.
 * @access private
 */

async function getMe(req,res){
  const User=await userModel.findById({_id:req.user.id});
  
  if(!User){
    return res.status(400).json({
      message:"no user found"
    })
  }
  return res.status(200).json({
    message:"User details fetched successfully",
    user:{
    id:User.id,
    username:User.username,
    email:User.email
    }
  })

}

module.exports = { registorUserController,loginUser,logout,getMe };
