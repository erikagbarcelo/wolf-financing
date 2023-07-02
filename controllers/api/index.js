const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const vsRoutes = require('./vsRoutes.js');

// mount to the router and prepend to the '/users'
router.use('/users', userRoutes);
router.use('/vestedStocks', vsRoutes);

module.exports = router;