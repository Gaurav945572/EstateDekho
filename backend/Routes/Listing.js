import express from "express";
import { middleWare } from "../Middleware/middleware.js";
import {createListing} from "../controllers/createListing.js"

const listingRouter = express.Router();

listingRouter.post('/create',middleWare,createListing);

export default listingRouter;
