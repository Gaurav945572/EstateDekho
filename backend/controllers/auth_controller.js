import User from "../model/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Middleware/error.js";

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword =await bcrypt.hash(password,10);
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
            return next(errorHandler(404, 'User not found!'));   
        }
        const verifyPassword = bcrypt.compareSync(password,validUser.password);
        if(!verifyPassword){
            return next(errorHandler(401, 'Wrong credentials!'));
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token ,{httpOnly:true}).status(200).json(rest);

    }catch(error){
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        // Ensure email is provided in the request body
        const { email, name, photo } = req.body;
        if (!email || !name || !photo) {
            return res.status(400).json({ "message": "Invalid input data" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            // Create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                avatar: photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};


export const signOut =(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        return res.status(200).json({ "message": "Use logged out successfully" });   
    } catch (error) {
        next(error);    
    }
}
