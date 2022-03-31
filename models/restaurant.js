// Create mongoose schema to validate form submissions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Configure restaurant schema
const RestaurantSchema = new Schema({
    restaurant:{type:String, required:true},
    website:{type:String, required:true},
    address:{type:String, required:true},
    type:{
        type:String,
        enum: ["Thai", "Chinese", "Japanese", "Mexican", "American", "Fast food", "Vietnamese", "Vegan", "Vegetarian", "Indian", "Breakfast", "Other"],
        required:true
    },
    dateAdded:{type:Date, default: Date.now},
    visited:{type:Boolean, required: true, default:false},
    happyHour:{type:Boolean, required:true, default:false},
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;