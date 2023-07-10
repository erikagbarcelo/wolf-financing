const router = require('express').Router();
// import our db connection for the SQL
const sequelize = require('../../config/connection');
// const { VestedStocks } = require('../../models');
const { Users, VestedStocks, Stocks } = require('../../models');
const withAuth = require('../../utils/auth');

/* Create
Route to signup a new ueser
Post method with endpoint '/api/users/'
Test with: {"username": "testUser",
            "password": "Password123",
            "firstName": "Rodney",
            "lastName": "Buller",
            "address": "123 Radiator Springs",
            "city": "Scottsdale",
            "state": "Arizona",
            "zip": "85251"}
*/
router.post('/', async (req, res) => {
    // console.log('req.body:', req.body)
    try {
        const newUser = await Users.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        });
        // save new session to database
        req.session.save(() => {
        // create session variables based on the newly signed up user
            (req.session.userId = newUser.id), (req.session.loggedIn = true);
            res.status(201).json(newUser) // 201 - Created
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

/* READ 
Route to retrieve all users
GET method with endpoint '/api/users/'
*/
// TODO: ICEBOX - Admin routes
router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll(
        // Reference tech-blog-v1.0, pt2 timestamp 1:25:00
/*      FIXME
        Suspect that seed file is fake data and unique user info doesn't coinside with vestedstocks.
            {
            attributes: {
                exclude: ['password'],
                include: [
                    sequelize.literal('(SELECT COUNT(*) FROM vestedstocks WHERE vestedstocks.userId = users.id)'), 'vestedStocksCount',
                ]
            },
        }
*/
        );

    res.status(200).json(users) // 200 - Ok
    } catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

// Route to retrieve logged in user's profile
// GET method with endpoint '/api/users/profile'
// TODO: Session was not working. Switched 'server.js' file import call variable name 'SequelizeStore'. Ask the question.
router.get('/profile', withAuth, async (req, res) => {
    try {
        const user = await Users.findByPk(req.session.userId, {
            // Reference tech-blog-v1.0, pt2 timestamp 45min
            // Reference tech-blog-v1.0, pt2 timestamp 1:25:00
            // FIXME: Will need to clean the data for this to work
            // include: [{ model: VestedStocks}, { model: Stocks }],
            attributes: {
                exclude: ['password'],
            },
        });
    
        // Validation Check to see if user exists
        if (!user) return res.status(404).json({ message: 'No user found.'}); // // tech-blog-v1.0, pt2 timestamp 45min
    
        res.status(200).json(user); // 200 - Ok
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
})

// Route to retrieve a single user by id
// GET method with endpoint '/api/users/:userId'
// TODO: ICEBOX - Admin routes
router.get('/:userId', async (req, res) => {
    try {
     const user = await Users.findByPk(req.params.userId, {
         // Reference tech-blog-v1.0, pt2 timestamp 45min
         // Reference tech-blog-v1.0, pt2 timestamp 1:25:00
         // FIXME: Will need to clean the data for this to work
         // include: [{ model: VestedStocks}, { model: Stocks }],
         attributes: {
             exclude: ['password'],
         },
     });
 
     // Validation Check to see if user exists
     if (!user) return res.status(404).json({ message: 'No user found.'}); // // tech-blog-v1.0, pt2 timestamp 45min
 
     res.status(200).json(user); // 200 - Ok
 } catch (error) {
     console.log(error);
     res.status(500).json(error); // 500 - internal server error
 } 
 });

/* Update 
Route to update a user by id
PUT method with endpoint '/api/users/profile'
test with any and all of:
{"username": "updatedTestUser",
"password": "updatedPassword123",
"firstName": "Rodney",
"lastName": "Buller",
"address": "123 Radiator Springs",
"city": "Scottsdale",
"state": "Arizona",
"zip": "85251"}
*/
// TODO: Ask why this worked with updating just the username. Ref tech-blog-v1.0, pt3 timestamp 35:30min
router.put('/profile', withAuth, async (req, res) => {
    try {
        // Pass in req.body to only update what's sent over by the  client
        const updatedUser = await Users.update(req.body, {
            where: {
                id: req.session.userId,
            },
            individualHooks: true,
        });

        if (!updatedUser[0]) return res.status(404).json({message: 'No User Found.'}); // 404 - Not Found

        console.log(updatedUser);
        res.status(202).json(updatedUser); // 202 - Accepted
    }  catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
});

/* Delete
Route to delete a user by id
DELETE method with endpoint '/api/users/profile'
*/

router.delete('/profile', withAuth, async (req, res) => {
    try {
        const deletedUser = await Users.destroy({
            where: {
                id: req.session.userId,
            },
        });

        if (!deletedUser[0]) return res.status(404).json({message: 'No User Found.'}); // 404 - Not Found

        res.status(202).json(deletedUser); // 202 - Accepted
    }   catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
});

/* Delete
Route to delete a user by id
DELETE method with endpoint '/api/users/:userId'
*/
// TODO: ICEBOX => Admin routes
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await Users.destroy({
            where: {
                id: req.params.userId,
            },
        });

        if (!deletedUser[0]) return res.status(404).json({message: 'No User Found.'}); // 404 - Not Found

        console.log(deletedUser);
        res.status(202).json(deletedUser); // 202 - Accepted
    }   catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
});

// **** Login ****
// Route to login an existing user
// POST method with endpoint '/api/users/login'
// expects (info provided by seed file) {"username":"fwesley2","password":"cT6!/D`55'B06{"}
router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { email: req.body.email }
        });

        if (!user) return res.status(400).json({message: 'Credentials not valid.'}); // 400 - Bad Request
        // Instance methog defined in '/models/Users'
        const validPw = await user.checkPassword(req.body.password) // This will hash then compare to the already hashed password in db

        if (!validPw) return res.status(400).json({message: 'Credentials not valid.'}); // 400 - Bad Request

        req.session.save(() => {
            // Create session variables based on the logged in ueser
            req.session.userId = user.id;
            req.session.loggedIn = true;
            res.status(200).json(user); // 200 = Ok
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - Internal error
    }

});

// Route to logout an existing user
// POST method with endpoint '/api/users/logout'
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        }); // 204 - Success, no content
    } else {
        res.status(404).end(); // 404 - Not found
    }
});

module.exports = router;