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
                    const Nquery = 'INSERT INTO `notifications`(`UserID`, `Title`, `Description`, `CreatedAt`, `isRead`) VALUES (?, ?, ?, ?, ?)';
                    const Nvalues = [NewUserID,'New Registration','Thank you for becoming a beloved member of this platform. We provide many industry leading games. This is the world\'s leading gaming platform. Try the lottery game developed by us. While enjoying the best gaming experience, you can also join unlimited agents and stay at home to earn money.', timeNow, 0];
                    db.query(Nquery,Nvalues, (err, result) => {
                    });
                    res.status(201).json({ Message: 'User registered successfully' });
                }
            });
        });
    });

   


    
};


exports.GameBetting = (req, res) => {
    const { CurrentPeriod, Amount, BetQuatity, GameTypeID, SelectID } = req.body; 
    const totalBetAmount = Amount * BetQuatity;
    const user = req.userDetail; 

    //Validate Period
    db.query('SELECT Period, CreatedAt FROM `wingo_gameid` WHERE `GameTypeID` = ? ORDER BY ID DESC LIMIT 1', [GameTypeID], (err, rows) => {
        if (err) {
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        if (rows.length > 0) {
            const currentGamePeriod=rows[0]
            if(CurrentPeriod!=currentGamePeriod.Period){
                return res.status(400).json({ Message: 'Invalid Game Period ID' });
            }

            // db.query('SELECT * FROM `wingo_games` WHERE `ID` = ? LIMIT 1', [GameTypeID], (err, grows) => {
            //     if (err) {
            //         return res.status(500).json({ Message: 'Internal Server Error' });
            //     }
            //     if (rows.length > 0) {
            //         const gameTypeData = grows[0];
            //         if(timeNow){
            //             return res.status(400).json({ Message: 'Invalid Game Period ID' });
            //         }
            //     };
            // });

        };
    });

    

    // Query the database to get the total balance of the user
    db.query('SELECT SUM(WalletAmount + eWalletAmount) AS AvailableBalance FROM wallets WHERE UserID = ?', [user.ID], (err, rows) => {
        if (err) {
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        if (rows.length > 0) {
            const AvailableBalance = rows[0].AvailableBalance;
            if (AvailableBalance >= totalBetAmount) {

                res.status(200).json({ Message: 'Bet Successfully Created' });
            } else {
                res.status(400).json({ Message: 'Insufficient Balance' });
            }
        } else {
            res.status(404).json({ Message: 'User not found or no balance available' });
        }
    });
};


exports.GetGamePeriod = (req, res) => {
    const { GameTypeID } = req.body; 
    // Query the database to get the total balance of the user
    db.query('SELECT Period, CreatedAt FROM `wingo_gameid` WHERE `GameTypeID` = ? ORDER BY ID DESC LIMIT 1', [GameTypeID], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        if (rows.length > 0) {
            res.status(200).json({Status:'OK', data:rows[0]});
        } else {
            res.status(404).json({ Message: 'No Game Period Found' });
        }
    });
}











///CronJob Code
exports.CRON = (req, res) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    

    db.query('SELECT * FROM `wingo_games`', (err, rows) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        rows.forEach(row => {
            const paddedID = String(row.ID).padStart(2, '0'); // Add leading zero if single digit
            const lastID = String(row.LastPeriodID).padStart(4, '0'); // Add leading zero if single digit
            // const firstPeriodId = `${year}${month}${day}${paddedID}0001`;
            const firstPeriodId = getCurrentPeriodId(row.Time,paddedID);
            const lastPeriodId = `${year}${month}${day}${paddedID}${lastID}`;
            db.query("SELECT * FROM `wingo_gameid` WHERE `GameTypeID` = ? ORDER BY ID DESC LIMIT 1",[row.ID], (error, results) => {
                if (error) throw error;
            
                if (results.length === 0) {
                    db.query("INSERT INTO `wingo_gameid` (`Period`, `GameTypeID`, `CreatedAt`) VALUES (?, ?, ?)", [firstPeriodId, row.ID, timeNow], (error, results) => {
                        if (error) throw error;
                        res.status(201).send('Created');
                        // Handle successful insertion
                    });
                } else if (lastPeriodId === results[0].Period) {
                    db.query("TRUNCATE TABLE `wingo_gameid`", (error, results) => {
                        if (error) throw error;
                        // db.query("TRUNCATE TABLE `tbl_result`", (error, results) => {
                        //     if (error) throw error;
                            db.query("INSERT INTO `wingo_gameid` (`Period`, `GameTypeID`, `CreatedAt`) VALUES (?, ?, ?)", [firstPeriodId, row.ID, timeNow], (error, results) => {
                                if (error) throw error;
                                res.status(201).send('Created');
                                // Handle successful insertion
                            });
                        // });
                    });
                } else {
                    const nextPeriod = parseInt(results[0].Period) + 1;
                    db.query("INSERT INTO `wingo_gameid` (`Period`, `GameTypeID`, `CreatedAt`) VALUES (?, ?, ?)", [nextPeriod, row.ID, timeNow], (error, results) => {
                        if (error) throw error;
                        res.status(201).send('Created');
                        // Handle successful insertion
                    });
                }
            });
        });
    });
};


function getCurrentPeriodId(time,PI) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate(); 
    const fmonth = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const fday = String(currentDate.getDate() + 1).padStart(2, '0'); 
    let paddedID = "0001";
    // Get current time
    const currentTime = new Date();
    const start = new Date(year, month - 1, day); // month - 1 because months are zero-indexed in JavaScript
    
    // Calculate difference in milliseconds
    const differenceInMillis = currentTime - start;

    // Calculate the number of 3-minute intervals
    const intervals = Math.floor(differenceInMillis / (parseInt(time) * 60 * 1000)); 

    // Increment paddedID accordingly
    const incrementedID = parseInt(paddedID) + intervals;
    
    // Format incrementedID
    const formattedID = String(incrementedID).padStart(paddedID.length, '0');

    // Construct current period ID
    const currentPeriodId = `${year}${fmonth}${fday}${PI}${formattedID}`;

    return currentPeriodId;
}
