// import express 
const express = require('express');
// import handlebars
const handlebars = require('express-handlebars')

const path = require('path');
// import express-session
const session = require('express-session');
// import SequelizeStore constructor
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//import connection to the database
const sequelize = require('./config/connection');
// set up handlebars object with custom helpers
const helpers = require('./utils/helpers');
// set up handlebars object
const hbs = handlebars.create({ helpers })

// import our routes
const routes = require('./controllers');

// set up the Express app
const app = express();
const PORT = process.env.PORT || 3001;


// Configure session object
const sess = {
    // secret is used to sign the cookies
    secret: process.env.SECRET,
    // cookie options
    cookie: {
        // cookie  will expire after one hour in milli-seconds (min * sec * milli-seconds)
        maxAge: 60 * 60 * 1000,
        // Only store session cookies when the protocol used by client to connect to our server is HTTP(S)
        httpOnly: true,
        scure: false
    },
    // resave session to store even if session is not modified during request-response cycle
    resave: false,
    // save uninitialized session to store (uninitialized means new but not modified)
    saveUninitialized: false,
    // Set-up session store
    store: new SequelizeStore({
        // Connect to our database to save sessions 
        db: sequelize
    }),
};

// Mount session middleware
app.use(session(sess));

// Mount handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Mount static middleware from the current working directory
app.use(express.static(path.join(__dirname, 'public')))

// mount the routes
app.use(routes);

/* connect to the database before starting the 
express server */
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port http://localhost:${PORT}`)

    })
});
