const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');
const { VestedStocks, Users, Stocks } = require('../../models');

// Render dashboard with stocks purchased by users pt2 timestamp 2:58min
// TODO: Only authenticated users can access their dashboard
// TODO: Once we have set up our session remove our ':userId' from endpoint and get userId from req.sessions instead
router.get('/', withAuth, async (req, res) => {
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

        // res.status(200).send('<h1> Dashboard </h1> <h2> Render the dashboard view with all stocks that users have purchased. </h2>');
	res.status(200).render('mystocks', { stocks: serializedStocks, loggedIn: true })
        
	} catch (error) {
		console.log(error);
		res.status(500).json(error); // 500 - Internal Server Error
	}        

})

module.exports = router;