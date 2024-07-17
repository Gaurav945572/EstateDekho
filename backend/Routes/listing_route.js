import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing_controller.js';
import { middleWare } from '../Middleware/middleware.js';

const router = express.Router();

router.post('/create', middleWare, createListing);
router.delete('/delete/:id', middleWare, deleteListing);
router.post('/update/:id', middleWare, updateListing);
router.get('/get/:id', getListing); //get the details of the list
router.get('/get', getListings); //serach listing

export default router;