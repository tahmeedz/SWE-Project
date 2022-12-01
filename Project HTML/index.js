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

db.runQuery('UPDATE restaurant_table SET vacant = 1');

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

    let username = req.body.username;
    let password = req.body.password;

    db.addUser(username, password);

    db.runQuery("select * from users");

    res.redirect('/login');
});

app.post('/reserve', (req, res) => {
    reservation.addBooking(req.body.number);
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
});


app.listen(8080, () => {
    console.log("server has started on port 8080");
});