import express from "express";
import { signin } from "../controllers/signup_controller.js";

const signInRouter = express.Router();

signInRouter.post("/signin",signin)


export default signInRouter;