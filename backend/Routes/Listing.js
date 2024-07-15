import express from "express";
import { middleWare } from "../Middleware/middleware.js";
import {createListing,getUserListing,deleteListing} from "../controllers/Listing.js"

const listingRouter = express.Router();

listingRouter.post('/create',middleWare,createListing);

listingRouter.get('/:id',middleWare,getUserListing);
listingRouter.delete('/delete/:id',middleWare,deleteListing);
export default listingRouter;
