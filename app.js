var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
require('dotenv').config();
require('./dbConnection')();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const languagesRouter = require('./routes/languages');
const scoresRouter = require('./routes/scores');
const leaderboardRouter  = require('./routes/leaderboard');


const {createClient} = require('redis');
const connectRedies = require('connect-redis')
const redisClient = createClient({legacyMode: true});

const RedisStore = connectRedies(session);
redisClient.connect().catch(e=> console.log('Could not connect to redis', e));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    store : new RedisStore({client:redisClient}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:false,
        maxAge: 1000 * 60 * 10
    }
}))

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/languages', languagesRouter);
app.use('/scores',scoresRouter);
app.use('/leaderboard', leaderboardRouter);

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
