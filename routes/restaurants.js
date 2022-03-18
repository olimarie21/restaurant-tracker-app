const router = require('express').Router({mergeParams:true});

// Import middleware for restaurant routes
const {getRestaurants, postRestaurant} = require('../controllers/restaurantController');

router.get('/', getRestaurants); // get all restaurants
router.post('/', postRestaurant); // post new restaurant

module.exports = router;