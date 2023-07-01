const router = require('express').Router();
// import our db connection for the SQL
const sequelize = require('../../config/connection');
// const { VestedStocks } = require('../../models');
const {Users} = require('../../models')/
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

// router.get('/', async (req, res) => {
//     try {
//         const users = await Users.findAll({
//             attributes: {
//                 exclude: ['password'],
//                 include: [
//                     sequelize.leteral('(SELECT COUNT(*) FROM vestedstocks WHERE vestedstocks.userId = users.id)'), 'vestedStocksCount',
//                 ]
//             },
//         });
//         res.status(201).json(users) // 201 - Created
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error) // 500 - internal server error
//     }
// });

module.exports = router;