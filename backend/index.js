import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/User.js";
import signUpRouter from "./Routes/SignUp.js"

dotenv.config();


mongoose.connect(process.env.key).then(()=>{
    console.log("mongoDB connected");
}).catch((error)=>{
    console.log(error)
});
const app = express();
app.use(express.json());


app.use("/api/user",userRouter);
app.use("/api/auth", signUpRouter)

app.listen(3000,()=>{
    console.log("listening on port 3000!");
})