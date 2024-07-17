import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user_route.js";
import cookieParser from "cookie-parser";
import listingRouter from './Routes/listing_route.js';
import authRouter from './Routes/auth_route.js'
import path from 'path';

dotenv.config();


mongoose.connect(process.env.key).then(()=>{
    console.log("mongoDB connected");
}).catch((error)=>{
    console.log(error)
});
const __dirname = path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

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