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
    res.render('wingo',{user:req.userDetail});
    console.log(req.userDetail)
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

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
