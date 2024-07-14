import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/User.js";
import signUpRouter from "./Routes/SignUp.js"
import signInRouter from "./Routes/SignIn.js"
import googleAuth from "./Routes/OAuth.js";
import cookieParser from "cookie-parser";
import signOutRouter from "./Routes/SignOut.js";
import listingRouter from './Routes/Listing.js'

dotenv.config();


mongoose.connect(process.env.key).then(()=>{
    console.log("mongoDB connected");
}).catch((error)=>{
    console.log(error)
});


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/user",userRouter);
app.use("/api/auth", signUpRouter)
app.use('/api/auth',signInRouter);
app.use('/api/auth/',googleAuth);
app.use('/api/auth/',signOutRouter);
app.use('/api/listing',listingRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode ||500;
    const message = err.message ||"Internal Server Error";
    return res.status(statusCode).json({
        "success":false,
        statusCode,
        message
    })
});


app.listen(3000,()=>{
    console.log("listening on port 3000!");
})