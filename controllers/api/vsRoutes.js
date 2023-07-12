// Come back to this Route. Complete stocks table first.
const router = require('express').Router();
const { VestedStocks, Users, Stocks } = require('../../models');

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
	console.log(req.body)
	console.log(req.session)
    try {
        const newVestment = await VestedStocks.create({
            stockTicker: req.body.stockTicker,
            nShares: req.body.nShares,
            // userId will com from req.session once we set up our sessions
            userId: req.session.userId
        }); 
        res.status(201).json(newVestment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error) // 500 - internal server error
    }
});

/***** READ *****/
// Route to retrieve all comments
// GET method with endpoint '/api/vsRoutes/'
router.get('/', async (req, res) => {
	try {
		// retrieve all existing comments from the database
		const comments = await VestedStocks.findAll({
			include: [ Stocks
				// { model: Users, attributes: ['username'] },
				// { model: Stocks, include: { model: Users, attributes: ['username'] } },
			],
		});
		res.status(200).json(comments); // 200 - OK
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

module.exports = router