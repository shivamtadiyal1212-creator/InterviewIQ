const dotenv=require('dotenv');
dotenv.config();
// const express=require("express");
const app=require("./src/app");
const dns=require("dns");
const connectToDatabase=require("./src/config/database");
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectToDatabase();
app.listen(process.env.PORT,()=>{
    console.log("server is running on port " + process.env.PORT);
});