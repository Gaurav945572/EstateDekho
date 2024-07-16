import express from "express";
import {test,updateUser,deleteUser,getUser} from "../controllers/user_controller.js"
import { middleWare } from "../Middleware/middleware.js";

const userRouter = express.Router();

userRouter.get("/test",test);
userRouter.post('/update/:id',middleWare,updateUser);
userRouter.delete('/delete/:id',middleWare,deleteUser);
userRouter.get('/:id', middleWare, getUser)

export default userRouter;