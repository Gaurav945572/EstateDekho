import express from "express";
import { signup } from "../controllers/signup_controller.js";

const signUpRouter = express.Router();

signUpRouter.post("/signup",signup)


export default signUpRouter;