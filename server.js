// import express 
const express = require('express');
//import connection to the database
const sequelize = require('./config/connection')

// set up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

/* connect to the database before starting the 
express server */
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    })
});
