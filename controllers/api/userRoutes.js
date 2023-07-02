const router = require('express').Router();
// import our db connection for the SQL
const sequelize = require('../../config/connection');
// const { VestedStocks } = require('../../models');
const { Users, VestedStocks, Stocks } = require('../../models');
const { destroy } = require('../../models/Users');

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
    console.log('req.body:', req.body)
    try {
        const newUser = await Users.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        });
        // TODO: modify session object to include user information and loggedIn boolean
        res.status(201).json(newUser) // 201 - Created
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
router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll(

        // ***** ERROR HERE *****
        // Suspect that seed file is fake data and unique user info doesn't coinside with vestedstocks.
        //     {
        //     attributes: {
        //         exclude: ['password'],
        //         include: [
        //             sequelize.literal('(SELECT COUNT(*) FROM vestedstocks WHERE vestedstocks.userId = users.id)'), 'vestedStocksCount',
        //         ]
        //     },
        // }

        );
        res.status(200).json(users) // 200 - Ok
    } catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

router.get('/:userId', async (req, res) => {
   try {
    const user = await Users.findByPk(req.params.userId, {
        // tech-blog-v1.0, pt2 timestamp 45min

        // Will need to clean the data for this to work
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

/* Update 
Route to update a user by id
PUT method with endpoint '/api/users/:userId'
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
// TODO: Authenticate - Only account owners can update their own account
router.put('/:userId', async (req, res) => {
    try {
        // Pass in req.body to only update what's sent over by the  client
        const updatedUser = await Users.update(req.body, {
            where: {
                id: req.params.userId,
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
DELETE method with endpoint '/api/users/:userId'
*/
// TODO: Authenticate - Only admin & account owners can update an account
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

// TODO: add a login route
// TODO: add a logout route

module.exports = router;