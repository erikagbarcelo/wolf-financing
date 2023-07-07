const router = require('express').Router();

// Render dashboard with stocks purchased by users pt2 timestamp 2:58min
// TODO: Only authenticated users can access their dashboard
// TODO: Once we have set up our session remove our ':userId' from endpoint and get userId from req.sessions instead
router.get('/:userId', async (req, res) => {
        res.status(200).send('<h1> Dashboard </h1> <h2> Render the dashboard view with all stocks that users have purchased. </h2>');
})


module.exports = router;