const express = require('express')
const graph = require('fbgraph');
const session = require('express-session')
const Authenticate = require('./controllers/Authentication')
const LoggedIn = require('./controllers/LoggedIn')
const postFetch = require('./controllers/postFetch')
require("dotenv").config();
global.__basedir = __dirname
//const db = require('./config/db.config.js');
//const Image = db.images;

// Configuration
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
const { post } = require('request');

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(session({ secret: "thisecretsecret" }))

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/auth', Authenticate);

// user gets sent here after being authorized
app.get('/UserHasLoggedIn', LoggedIn);
app.get('/postFetch', postFetch);

port = process.env.PORT
host = process.env.HOST

// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// })

app.listen(port, host, () => { console.log(`Server is listening on ${port}`) })