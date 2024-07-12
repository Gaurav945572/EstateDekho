import express from "express";
import { oauth } from "../controllers/auth_controller.js";

const googleAuth = express.Router();

googleAuth.post("/google", oauth);

export default googleAuth;
