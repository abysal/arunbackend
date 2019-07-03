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

app.use('/users',userRoute);
app.use('/books',bookRoute);

module.exports=app;

