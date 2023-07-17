// Come back to this Route. Complete stocks table first.
const router = require('express').Router();
const { VestedStocks, Users, Stocks } = require('../../models');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

/* Create
Route to Assign Shares
Post method with endpoint '/api/vsRoutes/'
Test with: {"stockTicker": "DPZ", "userId": 1, "nShares": 2}
*/
// FIXME: Will need updated after final ERD, Reference tech-blog-v1.0, pt3 timestamp 1:11min
// TODO: Only authenticated users can create a vested stock
// router.post('/', async (req, res) => {
//     try {
//         const newTicker = await VestedStocks.create({
//             stockTicker: req.body.stockTicker,
//             nShares: req.body.nShares,
//             // TODO: userId will com from req.session once we set up our sessions
//             userId: req.body.userId
//         }); 
//         res.status(201).json(newTicker);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error) // 500 - internal server error
//     }
// });

// New Investment
router.post('/', async (req, res) => {
	// console.log(req.body)
	// console.log(req.session)
    try {
		const stockCheck = await Stocks.findByPk( req.body.stockTicker )
		// console.log("This is a stock check", stockCheck)
		if (stockCheck) {
			const investmentCheck = await VestedStocks.findOne({ where: { userId: req.session.userId, stockTicker: req.body.stockTicker }})
			// console.log("This is a investment check", investmentCheck);
			if (investmentCheck) {
				const updatedNShares = req.body.nShares + investmentCheck.nShares
				// console.log("This is the update nShares", updatedNShares)
				// console.log("This is the Vestment Id", investmentCheck.vestedId)
				const updatedVestment = await VestedStocks.update({ nShares: updatedNShares }, { where: {vestedId: investmentCheck.vestedId }})
				console.log("This is the updated investments", updatedVestment)
				res.status(201).json(updatedVestment)
			}
			else {	
		// console.log( "This is a check" , isNewCheck )
        const newVestment = await VestedStocks.create({
			stockTicker: req.body.stockTicker,
            nShares: req.body.nShares,
            // userId will com from req.session once we set up our sessions
            userId: req.session.userId
        }); 
        res.status(201).json(newVestment);
	}}
	else {
		const ticker = req.body.stockTicker; 
		const requestUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${API_KEY}`;
		// const requestUrl = `https://api.polygon.io/v3/reference/exchanges?asset_class=stocks&locale=us&apiKey=${API_KEY}`;
	
		
		const result = await axios.get(requestUrl)
	
		const stockInfo = result.data.results[0]
		// console.log(stockInfo)
		// res.end()
	  
		// ********** Polygon API **************
	
		// console.log('req.body:', req.body)
	
		try {
			const newStock = await Stocks.create({
				ticker: req.body.stockTicker,
				open: stockInfo.o,
				close: stockInfo.c,
				lowestPrice: stockInfo.l,
				highestPrice: stockInfo.h
	})
	const newVestment = await VestedStocks.create({
		stockTicker: req.body.stockTicker,
		nShares: req.body.nShares,
		// userId will com from req.session once we set up our sessions
		userId: req.session.userId
	}); 
	res.status(201).json(newVestment);
} 
catch (error) {
	console.log(error);
	// TODO: Ask Instructor Why the error .json. (Assumption that we are returning an array.)
	// res.status(500).json(error) // 500 - internal server error
	res.status(500).end() // 500 - internal server error
}

    }} catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

/***** READ *****/
// Route to retrieve all vested stocks by user
// GET method with endpoint '/api/vsRoutes/'
router.get('/', async (req, res) => {
	try {
		// retrieve all existing comments from the database
		const vStocks = await VestedStocks.findAll({
			include: [ Stocks, Users
				// { model: Users, attributes: ['username'] },
				// { model: Stocks, include: { model: Users, attributes: ['username'] } },
			],
		});
		res.status(200).json(vStocks); // 200 - OK
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});

// Route to retrieve a single 
// GET method with endpoint '/api/vsRoutes/:commentId'
router.get('/:userId', async (req, res) => {
	try {
		// retrieve a single comment by primary key - the comment's id is passed via the endpoint parameter 'commentId'
		const comment = await VestedStocks.findAll({
            where: { userId: req.params.userId }}, {
			include: [ Stocks, 
				// { model: User, attributes: ['username'] },
				// { model: Post, include: { model: User, attributes: ['username'] } },
			],
		});
		res.status(200).json(comment); // 200 - OK
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});

// GET method with endpoint '/api/vsRoutes/:stockTicker'
router.delete('/:ticker', async (req, res) => {
    try {
        const deletedTicker = await VestedStocks.destroy({
            where: { userId: req.session.userId, stockTicker: req.body.stockTicker },
        });

        if (!deletedTicker[0]) return res.status(404).json({message: 'No User Found.'}); // 404 - Not Found

        // console.log(deletedTicker);
        res.status(202).json(deletedTicker); // 202 - Accepted
    }   catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    } 
});

module.exports = router