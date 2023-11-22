const express = require('express');
const app = express();
const port = 3000;
var expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(cookieParser());


app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.set('layout', 'layouts/layout');

const db = require('./config/mongoose.js');
const User = require('./models/userSchema.js');






app.use('/',require('./router/home.js'));


app.listen(port,()=>{
    console.log("Express fired up ");
})