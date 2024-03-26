// middleware/auth.js
const enc = require('../models/encrypt');
const db = require('../models/database');

module.exports = function(req, res, next) {
    //Get token from header
    const token = req.cookies.Token;

    // Check if not token
    if (!token) {
        return res.status(401).json({ Message: 'Invalid Login User' });
    }
    
    // Verify token
    try {
        const user = enc.decryptToObject(token);
        //req.user = decoded;

        db.query('SELECT * FROM users_logins WHERE UserID = ? AND Token = ? AND isActive = ?', [user.ID, token, 1], (err, rows) => {
            if (err) {
                handleError(err)
            } else {
                if (rows.length > 0) {
                    req.userDetail = user;
                    next();
                   
                } else {
                    handleError(err)
                }
            }
        });
    } catch(err) {
        handleError(err) 
    }

    function handleError(error) {
        res.clearCookie('Token');
        return res.status(401).json({ Message: 'Invalid User Login' });
    }
    
    function handleUnauthorized() {
        res.clearCookie('Token');
        return res.status(401).json({ Message: 'Invalid User Login' });
    }

};


