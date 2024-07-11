import User from "../model/user_model.js";
import bcrypt from "bcryptjs";

export const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    const hashedPassword =await bcrypt.hash(password,12);
    const newUser = new User({username,email,password:hashedPassword}); 
    try {
        await newUser.save();
        res.status(201).json({
            "message":"user has been created",
    })    
    } catch (error) {
        res.status(500).json(error.message);
       
    }
};