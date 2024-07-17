import jwt from "jsonwebtoken";

export const middleWare = (req,res,next)=>{
    const token = req.cookies.access-token;
    //console.log(token);
    if(!token){
        return res.status(401).json({message:"Unauthorised.."}); 
    }
    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).json({message:"Forbidden"});
        req.user = user;
        return next();
    });
};
 