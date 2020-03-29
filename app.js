const express = require('express');
const app = express();


const path = require('path');

const dotenv = require('dotenv'); // for the env
const mongoose = require('mongoose');
const bodyParser = require('body-parser');//bodyParser used of getting data from a form
const session = require('express-session');
const flash = require('connect-flash');

dotenv.config({path : './config.env'});

const employeeRoutes = require('./routes/employees');

//connecting to mongoDB database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser : true,  // for handling the Node.js warnings
    useUnifiedTopology : true,
    useCreateIndex : true
});

// app.use(bodyParser.json());
// body parser must be before views
app.use(bodyParser.urlencoded({extended : true}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

//middleware for express session
app.use(session({
    secret : "nodejs",
    resave : true,
    saveUninitialized : true
}))

//middleware for connect flash
app.use(flash());

//setting messages variable globally
app.use((req,res,next) => {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();

})
app.use(employeeRoutes);

const port = process.env.PORT; // PORT = 3000 in config.env file // best coding practices. storing this in a seperate file.

app.listen(port, ()=> {
    console.log('server has started at port 3000')
});