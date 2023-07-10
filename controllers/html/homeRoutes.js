const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Users, Stocks } = require('../../models');

// *** This should be vestedStocks. Will use seed file with stocks for now. ***
// Render homepage with all existing stocks
router.get('/', async (req, res) => {
    try {
        const stocks = await Stocks.findAll({
            /* FIXME
            include: [{  model: Users, attributes: ['username']}],
            attributes: {
                include: [
                    // Use plain SQL to get a count of the number of stocks for each user.
                    [
                        // TODO: Will need to finish the database architecture.
                        sequelize.literal(
                            '(SELECT COUNT(*) FROM vestedStocks WHERE vestedStocks.nShares = Users.id'
                        ),
                        // TODO: Title of the queury/column.
                        'stocksCount',
                    ]
                ]
            }
            */
        });

        // To Clean up data retrieved in the console.log
        // Reference Serilized Data tech-blog-v1.0, pt2 timestamp 2:30min
        /*
        const serializedStocks = [];
        for (i = 0 ; i < stocks.length; i++) {
            const serializedStock = stocks[i].get({ plain: true}); 
            serializedStocks.push(serializedStock);
        }
        */
        // Reference Serilized Data tech-blog-v1.0, pt2 timestamp 2:40min
        
        const serializedStocks = stocks.map(stock => stock.get({ plain: true }));
        
        console.log(serializedStocks);

        // TODO: Modify response with actual View Template
<<<<<<< HEAD
        res.status(200).render('homepage', { stocks: serializedStocks, loggedIn: req.session.loggedIn })
=======
        res.status(200).render('homepage', { 
        stocks: serializedStocks, 
        loggedIn: req.session.loggedIn,
     });
>>>>>>> 1bf731d375c271c00251dda9693510d2a35b7d59
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
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
<<<<<<< HEAD
	if (req.session.loggedIn) return res.status(200).redirect('/');
	res.status(200).render('signup');
})

// Render login page Reference pt2 timestamp 2:54min
router.get('/login', async (req, res) => {
	if (req.session.loggedIn) return res.status(200).redirect('/');
	res.status(200).render('login');
})
=======
    // TODO: Redirect to dashboard if user is already logged in.
    // TODO: modify response with actual signup page
    res.status(200).send('<h1> Sign Up Page </h1> <h2> Render the signup view. </h2>');
});

// Render login page Reference pt2 timestamp 2:54min
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) return res.status(200).redirect('/');
    res.status(200).render('login');
});
>>>>>>> 1bf731d375c271c00251dda9693510d2a35b7d59

module.exports = router;