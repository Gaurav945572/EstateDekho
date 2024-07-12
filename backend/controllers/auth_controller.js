import User from "../model/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword =await bcrypt.hash(password,12);
    const newUser = new User({username,email,password:hashedPassword}); 
    try {
        await newUser.save();
        res.status(201).json({
            "message":"user has been created",
    })    
    } catch (error) {
        next(error);
    }
};

export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(res.status(404).json({"message":"No user found"}));
            
        }
        const verifyPassword = bcrypt.compareSync(password,validUser.password);
        if(!verifyPassword){
            return next(res.status(401).json({"message":"Wrong credintials"}));
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access-token', token ,{httpOnly:true}).status(200).json(rest);

    }catch(error){
        next(error);

    }
}