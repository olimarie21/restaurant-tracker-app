const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name:{type:String, required:true},
    website:{type:String}
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;