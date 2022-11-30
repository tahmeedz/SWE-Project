
var mysql      = require('mysql');
// var async      = require('async');

var connection = mysql.createConnection({
  host     : 'sweproject.ctbow56krkjr.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  port     : 3306,
  password : 'Tahmeedz',
  database : 'SWEDb'
});

connection.connect();

module.exports = {
    runQuery: function(query) {
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            return results;
        });
    },

    addUser: function(username, password) {
        connection.query("INSERT INTO users (username, password) VALUES (\"" + username + "\", \"" + password + "\");", function (error, results, fields) {
            if (error) throw error;
        });
    },
    
    isValidUser: function(username, password, response) {
        let isValid = false;

        connection.query("SELECT * FROM users where username=\"" + username + "\" AND password=\"" + password + "\"", function (error, results, fields) {
            if (error) throw error;

            if(results.length > 0) {
                console.log('setting true...');
                response.redirect('./reservation');
            }  else {
                response.redirect("./login?error=invalid_username_password");
            }
        });

        return true;
    }
};