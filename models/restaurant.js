// Create mongoose schema to validate form submissions
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Configure restaurant schema
const RestaurantSchema = new Schema({
    restaurant:{
        type:String, 
        required: [true, 'Please enter the name of the restaurant.'],
        minLength: [1, 'The restaurant\'\s name must be at least 1 character.'],
        maxLength: [70, 'The restaurant\'\s name should not be longer than 70 characters.'] 
    },
    website: {
        type:String, 
        required: [true, "Please enter the restaurant\'\s website."]
    },
    address:{ 
        type:String, 
        required: [true, 'Please enter the restaurants address so we can provide directions!']
    },
    type:{
        type:String,
        enum: ["Thai", "Chinese", "Brazilian", "Japanese", "Mexican", "Cuban", "Korean", "American", "Fast food", "Vietnamese", "Vegan", "Vegetarian", "Indian", "Breakfast", "Other"],
        required: [true, 'Please select a category for the restaurant.']
    },
    dateAdded:{type:Date, default: Date.now},
    visited:{type:Boolean, required: true, default:false},
    happyHour:{type:Boolean, required:true, default:false},
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;