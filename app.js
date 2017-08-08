const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

/*
mongoose.createConnection(config.database, {
    useMongoClient:true
})

*/
mongoose.connect(config.database,{
    useMongoClient:true
});

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', ()=>{
    console.log('connected to database '+config.database)
})

mongoose.connection.on('error', (err)=>{
    console.log("Connection error "+err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

//Cors Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res)=>{
    res.send('Invalid endpoint you are in');
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, () => {
    console.log('Server started on port '+port);
})

