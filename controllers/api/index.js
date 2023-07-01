const router = require('express').Router();

const userRoutes = require('./userRoutes.js');

// mount to the router and prepend to the '/users'
router.use('/users', userRoutes);

module.exports = router;