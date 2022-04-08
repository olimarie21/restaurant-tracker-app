const router = require('express').Router({mergeParams:true});

const restaurantRouter = require('./restaurants.js');
router.use('/', restaurantRouter);

module.exports = router;