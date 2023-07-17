const router = require('express').Router();
const sequelize = require('../../config/connection');
const { VestedStocks, Users, Stocks } = require('../../models');

// *** This should be vestedStocks. Will use seed file with stocks for now. ***
// Render homepage with all existing stocks
router.get('/', async (req, res) => {
    try {
		// retrieve all existing comments from the database
		let vStocks = await VestedStocks.findAll({
			include: [ Stocks, Users ],
		});
        // Reference Serilized Data tech-blog-v1.0, pt2 timestamp 2:30min
        // const serializedStocks = []
        // for (let i=0; i < vStocks.length; i++) {
        //     const serializedStock = vStocks[i].get({ plain: true });
        //     serializedStocks.push(serializedStock);
        // }
        // Reference Serilized Data tech-blog-v1.0, pt2 timestamp 2:40min
        const serializedStocks = vStocks.map((stock) => stock.get({ plain: true }));
        console.log(serializedStocks)

		res.status(200).render('homepage', { stocks: serializedStocks, loggedIn: req.session.loggedIn })
        // res.status(200).send('<h1>Individual Share Info</h1><h2>Render for the Individual Share view along with all data for share.</h2>')
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}
});

// Render Individual Share Info

/*
router.get('/:ticker', async (req, res) => {
    try {
        // Reference retrieving data for a single stock for a single user tech-blog-v1.0, pt2 timestamp 1:28min
        // Find the primary key
        const stock = await Stocks.findByPk(req.params.ticker, {
            include: [
            { model: Stocks, attributes: [''] },
            { model: Users, include: { }}
            ]
        })
     // Validation Check and serilation at pt2 timestamp 2:48min

      res.status(200).send('<h1>Individual Share Info</h1><h2>Render for the Individual Share view along with all data for share.</h2>')

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
*/

// Render signup page Reference pt2 timestamp 2:52min
router.get('/signup', async (req, res) => {
	if (req.session.loggedIn) return res.status(200).redirect('/');
	res.status(200).render('signup');
})

// Render login page Reference pt2 timestamp 2:54min
router.get('/login', async (req, res) => {
	if (req.session.loggedIn) return res.status(200).redirect('/');
	res.status(200).render('login');
})

// router.get('/mystocks', async (req, res) => {
// 	if (req.session.loggedIn) return res.status(200).redirect('/');
// 	res.status(200).render('mystocks');
// })

module.exports = router;