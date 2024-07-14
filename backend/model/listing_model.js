import mongoose from "mongoose";

const ListingSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    regularPrice:{
        type:Number,
        require:true
    },
    discountPrice:{
        type:Number,
        require:true
    },
    bathroom:{
        type:Number,
        require:true
    },
    bedroom:{
        type:Number,
        require:true
    },
    furnished:{
        type:Boolean,
        require:true
    },
    parking:{
        type:Boolean,
        require:true
    },
    petsAllowed:{
        type:Boolean,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    offer:{
        type:Boolean,
        require:true
    },
    imageURL:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    }},
    {timestamps:true});


    
const Listing =  mongoose.model('Listing',ListingSchema);

export default Listing;