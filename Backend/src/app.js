const express=require("express");
const app=express();
// const authController=require('./controllers/auth.controller');
const cookieParser=require('cookie-parser');
const cors=require('cors');
// Require all the Route here
const authRouter=require('./routes/auth.routes');
const interviewRouter=require('./routes/interview.routes');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//Using all the Routes here
app.use("/api/auth",authRouter);
app.use('/api/interview',interviewRouter);



module.exports = app;