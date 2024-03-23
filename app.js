const express = require('express');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const db = require('./models/database');

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const apiRoutes = require('./routes/apiRoutes');

app.use('/api', apiRoutes);

// Page Routes
app.get('/',(req, res)=>{

    res.render('index');
})

app.get('/wingo',auth,(req, res)=>{
    db.query('SELECT * FROM `wingo_games` WHERE `isActive` = ? ORDER BY SortIndex ASC', [1], (err, result) => {
        if (err) {
            console.error('Error retrieving notifications:', err);
            res.status(500).send('Error retrieving notifications');
            return;
        }
        res.render('wingo',{user:req.userDetail,games:result});
    });
    
})

app.get('/activity',(req, res)=>{
    res.render('index');
})

app.get('/promotion',auth,(req, res)=>{
    res.render('Promotion');
})

app.get('/me',auth,(req, res)=>{
    res.render('me',{user:req.userDetail});
})

app.get('/wallet',auth,(req, res)=>{
    res.render('Wallet',{user:req.userDetail});
})

app.get('/recharge',auth,(req, res)=>{
    res.render('recharge');
})
app.get('/withdraw',auth,(req, res)=>{
    res.render('Withdraw');
})

app.get('/messages', auth, (req, res) => {
    db.query('SELECT * FROM `notifications` WHERE `UserID` = ? ORDER BY ID DESC', [req.userDetail[0].ID], (err, result) => {
        if (err) {
            console.error('Error retrieving notifications:', err);
            res.status(500).send('Error retrieving notifications');
            return;
        }
        // Extract the notification IDs from the result
        const notificationIDs = result.map(notification => notification.ID);
        
        // Update the isRead column for the retrieved notifications
        db.query('UPDATE `notifications` SET `isRead` = 1 WHERE `ID` IN (?)', [notificationIDs], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating notification isRead status:', updateErr);
                res.status(500).send('Error updating notification isRead status');
                return;
            }
            res.render('Notification', { notifications: result });
        });
    });
});



app.get('/logout',(req, res)=>{
    res.clearCookie('Token');
    res.redirect('/');
})

app.get('/login',(req, res)=>{
    const token = req.cookies.Token;
    const ReturnURL = req.query.ReturnURL;
    if (token) {
        if(ReturnURL){
            return res.redirect(ReturnURL);
        }else{
            return res.redirect('/');
        }
    }
    res.render('login',{ ReturnURL: ReturnURL });
})

app.get('/register',(req, res)=>{
    const token = req.cookies.Token;
    if (token) {
        return res.redirect('/');
    }
    const inviteCode = req.query.inviteCode;
    res.render('register',{ inviteCode: inviteCode });
})
// Page Routes End


const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
