const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts =require('express-ejs-layouts')
const bodyParser=require('body-parser')
const session = require('express-session');
const mongoose =require('mongoose');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
require('dotenv').config()

MONGODB_URI=process.env.MONGODB_URI;
const app = express();

app.listen(3002,()=>{
  console.log('app is running on port 3000');
})

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('Failed to connect');
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts)
app.set('layouts',"./layout")
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser())
app.use(session({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
    resave: false,
}))

//to prevent storing cache
app.use((req, res, next) => {
  res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"     
  );
  next();
})

app.use('/', usersRouter);
app.use('/admin', adminRouter);


