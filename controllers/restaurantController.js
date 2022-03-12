const Restaurant = require('../models/restaurant');

const postRestaurant = (req, res) => {
    let restaurant = new Restaurant(req.body);

    restaurant.save()
    .then(result => {
        res.status(201).send(req.body);
    })
    .catch(error=>res.status(500).send(error));
}

const getRestaurants = (req, res) => {
    Restaurant.find({}).exec()
    .then(allRestaurants => {
        res.status(200).send(allRestaurants);
    })
    .catch(error=>res.status(500).send(error));
}

module.exports = {
    postRestaurant,
    getRestaurants
};