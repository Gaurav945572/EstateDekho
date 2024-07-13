import express from "express";
import {test,updateUser} from "../controllers/user_controller.js"
import { middleWare } from "../Middleware/middleware.js";

const userRouter = express.Router();

userRouter.get("/test",test);
userRouter.post('/update/:id',middleWare,updateUser);

export default userRouter;