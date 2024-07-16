import express from "express";

import {getListings} from "../controllers/Listing.js"

const SearchingListing = express.Router();

SearchingListing.get('/get',getListings);

export default SearchingListing;
