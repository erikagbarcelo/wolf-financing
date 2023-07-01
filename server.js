// import express 
const express = require('express');
//import connection to the database
const sequelize = require('./config/connection');

// Check code
// require('./models')

// import our routes
const routes = require('./controllers');

// set up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// set up middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// mount the routes
app.use(routes);

/* connect to the database before starting the 
express server */
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port http://localhost:${PORT}`)
    })
});
