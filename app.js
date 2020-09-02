var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var mainRouter = require('./src/routes/main_router');
//Connect to DB
const dbConnection = require('./db/connection');
dbConnection.connect(process.env.MONGO_ADDRESS);
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', mainRouter);

module.exports = app;
