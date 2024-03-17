// middleware/auth.js
const enc = require('../models/encrypt');
const db = require('../models/database');

module.exports = function(req, res, next) {
    //Get token from header
    const token = req.cookies.Token;

    // Check if not token
    if (!token) {
        return res.redirect('/login?ReturnURL=' + encodeURIComponent(req.originalUrl));
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
                    const procedureName = `user_GetUser`;
                    db.query('CALL ??(?)', [procedureName, user.ID], (error, results, fields) => {
                        if (error) {
                            handleError(err)
                        }else{
                            if (results.length > 0) {
                                results[0][0].lastlogin = user.loginTime; // Adding the lastlogin key
                                req.userDetail = results[0];
                                next();
                            } else {
                                handleUnauthorized();
                            }
                        }
                    });
                   
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
        res.redirect('/login?ReturnURL=' + encodeURIComponent(req.originalUrl));
        return;
    }
    
    function handleUnauthorized() {
        res.clearCookie('Token');
        res.redirect('/login?ReturnURL=' + encodeURIComponent(req.originalUrl));
        return;
    }

};


