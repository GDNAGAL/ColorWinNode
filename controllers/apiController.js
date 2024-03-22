// controllers/apiController.js
const db = require('../models/database');
const enc = require('../models/encrypt')
const moment = require('moment-timezone');
const timeNow = moment.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

exports.login = (req, res) => {
    const clientIP = req.ip;
    const { Username, Password } = req.body; 
    const hashPassword = enc.encrypt(Password);

    // Query the database to find a user with the provided username and password
    db.query('SELECT * FROM users WHERE Mobile = ? AND Password = ?', [Username, hashPassword], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ Message: 'Internal Server Error' + err });
        } else {
            if (rows.length > 0) {
                // User with provided credentials found
                const user = rows[0];
                user.loginTime = timeNow;
                const token = enc.encryptObject(user);

                // Insert query to add a new user login record into the database
                const insertQuery = 'INSERT INTO `users_logins`(`UserID`, `Token`, `CreatedAt`, `isActive`, `IP_Address`) VALUES (?, ?, ?, ?, ?)';
                const insertValues = [user.ID, token, timeNow, 1, clientIP];

                // Update query to update user login time and IP address
                const updateQuery = 'UPDATE `users_logins` SET `isActive` = ? WHERE UserID = ?';
                const updateValues = [0,user.ID];

                db.beginTransaction(err => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ Message: 'Internal Server Error' });
                        return;
                    }

                    // Insert the new user login record
                    db.query(updateQuery, updateValues, (err, result) => {
                        if (err) {
                            console.error(err);
                            db.rollback(() => {
                                res.status(500).json({ Message: 'Internal Server Error' });
                            });
                            return;
                        }

                        // Update the user login time and IP address
                        db.query(insertQuery, insertValues, (err, result) => {
                            if (err) {
                                console.error(err);
                                db.rollback(() => {
                                    res.status(500).json({ Message: 'Internal Server Error' });
                                });
                                return;
                            }

                            db.commit(err => {
                                if (err) {
                                    console.error(err);
                                    db.rollback(() => {
                                        res.status(500).json({ Message: 'Internal Server Error' });
                                    });
                                    return;
                                }

                                res.json({ Message: 'Login successful', Token: token });
                            });
                        });
                    });
                });
            } else {
                // No user found with provided credentials
                res.status(401).json({ Message: 'Invalid username or password'});
            }
        }
    });
};


exports.register = (req, res) => {
    const { Mobile, Password, ConfirmPassword, InviteCode, AcceptPrivary } = req.body;
    const hashPassword = enc.encrypt(Password);
    const expectedKeys = ['Mobile', 'Password', 'ConfirmPassword', 'InviteCode'];
    const receivedKeys = Object.keys(req.body);
    const missingKeys = expectedKeys.filter(key => !receivedKeys.includes(key));

    //Check All Parameter Exist Or Not
    if (missingKeys.length > 0) {
        return res.status(400).json({ Message: `Bad Request` });
    }

    const FullName = "MEMBER"+ Math.floor(Math.random() * 1000);
    const Email = null;
    const OwnCode = Math.floor(Math.random() * 1000000) + Date.now();
    
    //Validate Empty Values
    if (Mobile === '' || Password === '' || ConfirmPassword === '' || InviteCode === '') {
        return res.status(400).json({ Message: 'Please fill in all required fields' });
    }

    // Check if Password and ConfirmPassword match
    if (Password !== ConfirmPassword) {
        return res.status(400).json({ Message: 'Passwords do not match' });
    }
    //validate Mobile No.
    db.query('SELECT * FROM users WHERE Mobile = ?', [Mobile], (err, mrows) => {
        if (err) {
            return res.status(500).json({ Message: 'Internal Server Error' });
        } else {
            if (mrows.length > 0) {
                return res.status(400).json({ Message: 'Mobile No. Already Registred' });
            }
        }
        //validate Invite Code4.
        db.query('SELECT * FROM users WHERE OwnCode = ?', [InviteCode], (err, rows) => {
            if (err) {
                return res.status(500).json({ Message: 'Internal Server Error' });
            } else {
                if (rows.length == 0) {
                    return res.status(400).json({ Message: 'Invalid Invite Code.' });
                }
            }
            if(AcceptPrivary == 0){
                return res.status(400).json({ Message: 'Please Accept Privcy Policy' });
            }
            const query = 'INSERT INTO `users` (`FullName`, `Mobile`, `Email`, `Password`, `RefCode`, `OwnCode`, `isReferalBonusCredited`, `Privacy`, `Staus`, `CreatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [FullName, Mobile, Email, hashPassword, InviteCode, OwnCode, 0, AcceptPrivary, 1, timeNow];
            // Insert query to add a new user into the database
            db.query(query,values, (err, result) => {
                if (err) {
                    res.status(500).json({ Message: 'Internal Server Error' });
                } else {
                    const NewUserID = result.insertId;
                    const Nquery = 'INSERT INTO `notifications`(`UserID`, `Title`, `Description`, `CreatedAt`) VALUES (?, ?, ?, ?)';
                    const Nvalues = [NewUserID,'New Registration','Thank you for becoming a beloved member of this platform. We provide many industry leading games. This is the world\'s leading gaming platform. Try the lottery game developed by us. While enjoying the best gaming experience, you can also join unlimited agents and stay at home to earn money.', timeNow];
                    db.query(Nquery,Nvalues, (err, result) => {
                    });
                    res.status(201).json({ Message: 'User registered successfully' });
                }
            });
        });
    });

   


    
};


exports.getUsers = (req, res) => {
    // Logic to fetch users from database
    // Example:
    db.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ Message: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
};

exports.createUser = (req, res) => {
    // Logic to create a new user
};
