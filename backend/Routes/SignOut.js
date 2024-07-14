import express from "express";
import { signout } from "../controllers/auth_controller.js";

const signOutRouter = express.Router();

signOutRouter.post("/signout",signout)


export default signOutRouter;