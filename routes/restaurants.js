const router = require('express').Router({mergeParams:true});

const {getRestaurants, postRestaurant} = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.post('/', postRestaurant);

module.exports = router;