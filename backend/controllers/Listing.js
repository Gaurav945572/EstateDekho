import Listing from "../model/listing_model.js"

export const createListing = async(req,res,next)=>{
    try {
        const listing  = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
        
    }
}


export const getUserListing = async(req,res,next)=>{
        if(req.user.id=== req.params.id){
            // res.status(413).json({message:"You can get your own list only"});
            const listing = await Listing.find({userRef:req.params.id});
            console.log(listing);
        res.status(206).json(listing);
        }
    else{
        res.status(439).json({message:"You can get your own list only"});  
    }
}


export const deleteListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return res.status(434).json({"req.param.id":req.params.id});
    }
    if(listing.userRef !== req.user.id){
        return res.status(431).json({message:listing.userRef});
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(213).json({message:"Listing deleted successfully!!"});
    } catch (error) {
        next(error);   
    }
}