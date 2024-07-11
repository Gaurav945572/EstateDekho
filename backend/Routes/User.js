import express from "express";
import {test} from "../controllers/user_controller.js"

const userRouter = express.Router();

userRouter.get("/test",test);

export default userRouter;