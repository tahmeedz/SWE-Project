
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
    runQuery: function(query, callback) {
        return connection.query(query, callback);
    },

    updateUser: function(preferred_diner, email, ) {

    },

    addUser: function(username, password, email, phone) {
        connection.query("INSERT INTO users (username, password) VALUES (\"" + username + "\", \"" + password + "\");", function (error, results, fields) {
            if (error) throw error;
        });
    },
    
    login: function(username, password, response) {
        let isValid = false;

        connection.query("SELECT * FROM users where username=\"" + username + "\" AND password=\"" + password + "\"", function (error, results, fields) {
            if (error) throw error;

            if(results.length > 0) {
                let user = results[0];
                user.name ? response.cookie('name', user.name) : '';
                user.phone ? response.cookie('phone', user.phone) : '';
                user.email ? response.cookie('email', user.email) : '';
                user.preferred_diner ? response.cookie('preferred_diner', user.preferred_diner) : '';
                user.home_address ? response.cookie('home_address', user.home_address) : '';
                user.billing_address ? response.cookie('billing_address', user.billing_address) : '';
                user.credit_card_number ? response.cookie('credit_card_number', user.credit_card_number) : '';
                user.credit_card_expiration ? response.cookie('credit_card_expiration', user.credit_card_expiration) : '';
                user.credit_card_cvv ? response.cookie('credit_card_cvv', user.credit_card_cvv) : user.credit_card_cvv;

                response.redirect('./reservation');
            }  else {
                response.redirect("./login?error=invalid_username_password");
            }
        });
    }
};