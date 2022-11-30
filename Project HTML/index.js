// This is the bulk of the backend, queries and all functions that end up in some html pages
//Dylan did the first draft of this page including the extensions below and middleware.

const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const fs = require("fs");
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const db = require("./js/db_connection");
const reservation = require('./js/reservation');
const { user } = require('pg/lib/defaults');
const server = http.createServer(app);
module.exports = { app };

const users = new Map();

// middleware
app.use(cors());
app.use(express.json()); //req.body


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './home.html'));
});

app.get('/reservation', (req, res) => { 
    res.sendFile(path.join(__dirname, './reservation.html'));
});

app.get('/register', (req, res) => { 
    res.sendFile(path.join(__dirname, './register.html'));
});

app.get('/login', (req, res) => { 
    res.sendFile(path.join(__dirname, './login.html'));
});

app.get('/profile', (req, res) => { 
    res.sendFile(path.join(__dirname, './profile_page.html'));
});


app.post('/registerUser', (req, res) => { 

    console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;

    db.addUser(username, password);

    db.runQuery("select * from users");

    res.redirect('/login');
});

app.post('/reserve', (req, res) => {

    // console.log(req.body);
    reservation.addBooking(req.body.number);
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log(db.isValidUser(username, password, res));

    // if(db.isValidUser(username, password, res)) {
    //     res.redirect('./reservation');
    // } else {
    //     res.redirect("./login?error=invalid_username_password");
    // }
});
 
// app.get('/register', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client/register.html'));
// });
// app.get('/profile', function(req, res) {
//     res.render(__dirname + "/client/Profile_Page.html", { userName: userName, useradd1: useradd1, useradd2: useradd2, usercity:usercity, userstate:userstate, userzip:userzip });
// });
// app.get('/login', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client/login.html'));
// });
// app.get('/fuel_quote', function(req, res) {
//     res.render(__dirname + "/client/fuel.html", { userAddr: userAddr, inState: inState, hasHistory: hasHistory });
// });


app.listen(8080, () => {
    console.log("server has started on port 8080");
});