import express from "express";
import { signup } from "../controllers/auth_controller.js";

const signUpRouter = express.Router();

signUpRouter.post("/signup",signup)


export default signUpRouter;