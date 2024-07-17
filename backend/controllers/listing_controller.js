import Listing from "../model/listing_model.js"

export const createListing = async(req,res,next)=>{
    try {
        const listing  = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
        
    }
}





export const deleteListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return res.status(434).json({"req.param.id":req.params.id});
    }
    if(listing.userRef !== req.user.id){
        return res.status(431).json({message:"You can delete your own list only"});
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(213).json({message:"Listing deleted successfully!!"});
    } catch (error) {
        next(error);   
    }
};

export const updateListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return res.status(454).json({message:"Listing not found"});
    }
    if(listing.userRef !== req.user.id){
        return res.status(431).json({message:"You can update your own list only"});
    }
    try {
        const updateList = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(248).json(updateList);        
    } catch (error) {
        
        next(error);
        
    }
}


export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return res.status(465).json({message:"No list found"});
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };

  export const getListings = async (req, res, next) => {
    //return res.status(404).json({message:"hi there"});
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
      let furnished = req.query.furnished;
      let parking = req.query.parking;
      let petsAllowed = req.query.petsAllowed;
      let type = req.query.type;
      const searchTerm = req.query.searchTerm || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';
  
      // Handling default values for boolean queries
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
      if (petsAllowed === undefined || petsAllowed === 'false') {
        petsAllowed = { $in: [false, true] };
      }
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      // Querying listings based on filters
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        petsAllowed,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  };