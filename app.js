const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const multer=require('multer');
// app.use(bodyParser.json());
const morgan=require('morgan');
const fs= require('fs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('./DB/mongoose');
app.use('/books',express.static('./book'));
app.use(express.static("./ProfilePicture"));

const userRoute=require('./Routes/user');
const bookRoute = require('./Routes/book');
const buyRoute=require('./Routes/buy');

app.use('/users',userRoute);
app.use('/books',bookRoute);
app.use('/buys',buyRoute);

module.exports=app;

