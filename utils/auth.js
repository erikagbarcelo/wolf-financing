const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect ther user to the login page
    if (!req.session.loggedIn) return res.redirect('/login');
    // Otherwise, execute the function that comes next
    next();
};

module.exports = withAuth;