const router = require('express').Router();
// import our db connection for the SQL
const sequelize = require('../../config/connection');
const { Stocks } = require('../../models');
const withAuth = require('../../utils/auth');

// FIXME: Will need updated after final ERD, Reference tech-blog-v1.0, pt3 timestamp 1:11min
/* Create
Route to signup a new ueser
Post method with endpoint '/api/users/'
Test with: {"ticker": "F", 
"company": "Ford", 
"median": 13.00, 
"todayHigh": 14.50,
"todayLow": 12.50,
"midYearHigh": 16.50,
"midYearLow": 10.50}
*/
// TODO: Only authenticated users can create a post
router.post('/', async (req, res) => {
    console.log('req.body:', req.body)
    try {
        const newStock = await Stocks.create({
            ticker: req.body.ticker, 
            company: req.body.company, 
            median: req.body.median, 
            todayHigh: req.body.todayHigh,
            todayLow: req.body.todayLow,
            midYearHigh: req.body.midYearHigh,
            midYearLow: req.body.midYearLow,
        });
        // TODO: modify session object to include user information and loggedIn boolean
        res.status(201).json(newStock) // 201 - Created
    } 
    catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

/* READ 
Route to retrieve all stocks
GET method with endpoint '/api/stocks/'
*/
router.get('/', async (req, res) => {
    try {
        const stocks = await Stocks.findAll(
        // Reference tech-blog-v1.0, pt2 timestamp 45min
        // Reference tech-blog-v1.0, pt2 timestamp 1:25:00
/*        FIXME: Will need updated after ERD finalized
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
        res.status(200).json(stocks) // 200 - Ok
    } catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

/* Update 
Route to update a stock by ticker
PUT method with endpoint '/api/users/:ticker'
test with any and all of:
{"ticker": "F", 
"company": "Updated Company info for Ford", 
"median": 13.00, 
"todayHigh": 14.50,
"todayLow": 12.50,
"midYearHigh": 16.50,
"midYearLow": 10.50}
*/
// TODO: Authenticate - Only account owners can update their own account
router.put('/:ticker', async (req, res) => {
    try {
        // Pass in req.body to only update what's sent over by the  client
        const updatedStock = await Stocks.update(req.body, {
            where: {
                ticker: req.params.ticker,
            
            },
        });

        // Reference Validation Check tech-blog-v1.0, pt2 timestamp 1:41min
        if (!updatedStock[0]) return res.status(404).json({message: 'No Stock Found.'}); // 404 - Not Found

        console.log(updatedStock);
        res.status(202).json(updatedStock); // 202 - Accepted
    }  catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
});

/* Delete
Route to delete a stock by ticker
DELETE method with endpoint '/api/users/:ticker'
*/
// TODO: Authenticate - Only admin & account owners can update an account
router.delete('/:ticker', async (req, res) => {
    try {
        const deletedTicker = await Stocks.destroy({
            where: {
                ticker: req.params.ticker,
            },
        });

        if (!deletedTicker[0]) return res.status(404).json({message: 'No User Found.'}); // 404 - Not Found

        console.log(deletedTicker);
        res.status(202).json(deletedTicker); // 202 - Accepted
    }   catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
});

module.exports = router