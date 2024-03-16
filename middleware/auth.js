// middleware/auth.js

// const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function(req, res, next) {
    //Get token from header
    const token = req.cookies.Token;

    // Check if not token
    if (!token) {
        return res.redirect('/login?ReturnURL=' + encodeURIComponent(req.originalUrl));
    }

    // Verify token
    // try {
    //     const decoded = verifyToken(token);
    //     req.user = decoded.user;
    //     next();
    // } catch (err) {
    //     res.redirect('/login?ReturnURL=' + encodeURIComponent(req.originalUrl));
    // }
    next();
};

function verifyToken(token){
    let user = {
        "name":"Gordhan"
    }
    return user;
}