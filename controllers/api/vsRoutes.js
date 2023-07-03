// Come back to this Route. Complete stocks table first.
const router = require('express').Router();
const { VestedStocks } = require('../../models');

/* Create
Route to signup a new ueser
Post method with endpoint '/api/users/'
Test with: {"stockTicker": "F", "nShares": 10, "userId": 10}
*/
// TODO: Only authenticated users can create a vested stock
router.post('/', async (req, res) => {
    try {
        const newTicker = await VestedStocks.create({
            stockTicker: req.body.stockTicker,
            nShares: req.body.nShares,
            // TODO: userId will com from req.session once we set up our sessions
            userId: req.body.userId
        }); 
        res.status(201).json(newTicker);
    } catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

module.exports = router