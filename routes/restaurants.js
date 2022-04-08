const router = require('express').Router({mergeParams:true});

// Import middleware for restaurant routes
const {getRestaurants, postRestaurant, search, getSingleRestaurant} = require('../controllers/restaurantController');
const {ajvValidator} = require('../controllers/restaurantAJV');

router.get('/restaurants', getRestaurants); // get all restaurants
router.post('/restaurants', ajvValidator, postRestaurant); // post new restaurant
router.get('/search', search);
router.get('/restaurants/:id', getSingleRestaurant);

module.exports = router;