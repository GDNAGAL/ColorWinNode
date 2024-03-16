const express = require('express');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const apiRoutes = require('./routes/apiRoutes');

app.use('/api', apiRoutes);

app.get('/',(req, res)=>{
    res.render('index');
})

app.get('/wingo',auth,(req, res)=>{
    res.render('wingo');
})

app.get('/login',(req, res)=>{
    const ReturnURL = req.query.ReturnURL;
    res.render('login',{ ReturnURL: ReturnURL });
})

app.get('/register',(req, res)=>{
    const inviteCode = req.query.inviteCode;
    res.render('register',{ inviteCode: inviteCode });
})

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
