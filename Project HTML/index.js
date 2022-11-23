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
const server = http.createServer(app);
module.exports = { app };

const users = new Map();

// middleware
app.use(cors());
app.use(express.json()); //req.body

// var sql = require("mssql");

// Casey did the initial database configuration below which differs by group member
// var dbConfig = {
//     server: "localhost",
//     user: "test",
//     password: "dylan",
//     database: "FuelApplication",
//     trustServerCertificate: true,
//     parseJson: true,

// };
let Results;
// ROUTES
//These routes are a combination of Casey and Dylan as we created, configured and deleted as needed.


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
    users.set(req.body.username, req.body.password);
    console.log(users);
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(users.has(username)) {
        let value = users.get(username);
        console.log(value);
        if (value === password) {
            res.redirect('./reservation');
        } else {
            res.redirect("./login?error=invalid_username_password");
        }
    } else {
        res.redirect("./login?error=invalid_username_password");
    }
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