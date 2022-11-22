var Username = document.getElementById('username');
var pw = document.getElementById('password');

// storing input from register-form
function store() {
    localStorage.setItem('Username', Username.value);
    localStorage.setItem('pw', pw.value);
    var storedName = localStorage.getItem('Username');
    var storedPw = localStorage.getItem('pw');
    alert("Stored: " + storedName + ", " + storedPw);
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {
    // stored data from the register-form
    var storedName = localStorage.getItem('Username');
    var storedPw = localStorage.getItem('pw');
    
    // entered data from the login-form
    var userName = document.getElementById('login-username').value;
    var userPw = document.getElementById('login-password').value;
    
    alert("Stored: " + storedName + ", " + storedPw + " Entered: " + userName + ", " + userPw);
    // check if stored data from register-form is equal to data from login form
    if(userName.value != storedName || userPw.value != storedPw) {
        alert('ERROR');
    }else {
        alert('You are logged in.');
    }
}