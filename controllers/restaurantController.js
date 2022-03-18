// create middleware for routes
const Restaurant = require('../models/restaurant');

// post restaurant middleware
const postRestaurant = (req, res) => {
    let restaurant = new Restaurant(req.body);

    restaurant.save()
    .then(result => {
        res.status(201).send(req.body);
    })
    .catch(error=>res.status(500).send(error));
}

// get all restaurants middleware
const getRestaurants = (req, res) => {
    Restaurant.find({}).exec()
    .then(allRestaurants => {
        res.status(200).send(allRestaurants);
    })
    .catch(error=>res.status(500).send(error));
}

// export middleware
module.exports = {
    postRestaurant,
    getRestaurants
};