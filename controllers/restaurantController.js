// create middleware for routes
const { ObjectId } = require('mongodb');
const Restaurant = require('../models/restaurant');

// post restaurant middleware
const postRestaurant = (req, res) => {
    let restaurant = new Restaurant(req.body);

    restaurant.save()
    .then(res => {
        res.status(201).json({
            data: restaurant,
            message: 'success'
        });
    })
    .catch(error=>res.status(500).send(error));
}

// get all restaurants middleware
const getRestaurants = (req, res) => {
    let searchParams = {};

    if(req.query.restaurant) {
        searchParams = {
            ...searchParams,
            restaurant: req.query.restaurant
        }
    }
    if(req.query.type) {
        searchParams = {
            ...searchParams,
            type: req.query.type
        }
    } if(req.query.happyHour) {
        searchParams = {
            ...searchParams,
            happyHour: req.query.happyHour
        }
    }    
    
    Restaurant.find(searchParams).select({}).exec()
    .then(allRestaurants=>{
            res.status(200).json(allRestaurants);
            })
        .catch(error=>res.status(500).send(error));        
    }
    

// get all restaurants middleware
const getSingleRestaurant = (req, res) => {
    
    Restaurant.deleteOne({"_id":ObjectId(req.params.id)}).select({}).exec()
    .then(restaurant=>{
            res.status(200).json(restaurant);
            })
        .catch(error=>res.status(500).send(error));        
    }
    
    

// search route    
const search = (req, res) => {
    Restaurant.aggregate([
        {
            "$search": {
                "autocomplete": {
                    "query": `${req.query.term}`,
                    "path": "restaurant",
                    "fuzzy":  { // make search more tolerant
                        "maxEdits": 2 // allow character variation in search
                    }
                }
            }
        }
    ])
    .then(allRestaurants => {
        res.status(200).json(allRestaurants);
    })
    .catch(error=>res.status(500).send(error));      
}

// export middleware
module.exports = {
    postRestaurant,
    getRestaurants,
    getSingleRestaurant,
    search
};