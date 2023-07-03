const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const vsRoutes = require('./vsRoutes.js');
const stocks = require('./stockRoutes.js');

// mount to the router and prepend to the '/users'
router.use('/users', userRoutes);
router.use('/vsRoutes', vsRoutes); // *** Fix the prepended route ***
router.use('/stocks', stocks);

module.exports = router;