import express from "express";
import { middleWare } from "../Middleware/middleware.js";
import {createListing,getUserListing,deleteListing,updateListing,getListing,getListings} from "../controllers/Listing.js"

const listingRouter = express.Router();

listingRouter.post('/create',middleWare,createListing);

listingRouter.get('/:id',middleWare,getUserListing);
listingRouter.delete('/delete/:id',middleWare,deleteListing);
listingRouter.post('/update/:id',middleWare,updateListing);
listingRouter.get('/get/:id',getListing);
listingRouter.get('/get',getListings);

export default listingRouter;
