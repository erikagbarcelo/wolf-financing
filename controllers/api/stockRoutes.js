const router = require('express').Router();
// import our db connection for the SQL
const sequelize = require('../../config/connection');
const { Stocks } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

// FIXME: Will need updated after final ERD, Reference tech-blog-v1.0, pt3 timestamp 1:11min
/* Create
Route to signup a new ueser
Post method with endpoint '/api/stocks/'
Test with: {"ticker": "F"}
*/
// TODO: Only authenticated users can create a db of their stocks owned
router.post('/', async (req, res) => {
  
    // ********** Polygon API **************
    /*
    User will input a Ticker they own and this will create the database of info for specified ticker owned.
    This will more than likely after to loop through the tickers owned by an individual.     
    */

    const ticker = req.body.ticker; 
    console.log(ticker)
    // To sample of data pulled
    // curl https://api.tiingo.com/tiingo/daily/GM/prices?token=4f7127b3a6f121dfd9506fba4b21a6ddf077b2ed
    // curl https://api.polygon.io/v2/aggs/ticker/F/range/1/day/2023-01-09/2023-01-09?apiKey=gtCLIGpsLEVTMKeT4XV9rZcX7ivq3M79
    const requestUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${API_KEY}`;
    // const requestUrl = `https://api.polygon.io/v3/reference/exchanges?asset_class=stocks&locale=us&apiKey=${API_KEY}`;

    
    const result = await axios.get(requestUrl)

    const stockInfo = result.data.results[0]
    // console.log(stockInfo)
    res.end()
  
    // ********** Polygon API **************

    // console.log('req.body:', req.body)

    try {
        const newStock = await Stocks.create({
            ticker: req.body.ticker,
            open: stockInfo.o,
            close: stockInfo.c,
            lowestPrice: stockInfo.l,
            highestPrice: stockInfo.h
        });
        // TODO: modify session object to include user information and loggedIn boolean
        // res.status(201).json(newStock) // 201 - Created
        res.status(201).end() // 201 - Created
    } 
    catch (error) {
        console.log(error);
        // TODO: Ask Instructor Why the error .json. (Assumption that we are returning an array.)
        // res.status(500).json(error) // 500 - internal server error
        res.status(500).end() // 500 - internal server error
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