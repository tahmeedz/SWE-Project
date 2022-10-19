var login_Info = {username: "Username01", password: "Password123"}

function checkUser(login_Info) {
    var storedUser = localStorage.getItem('Users');
    var storedPass = localStorage.getItem('Passwords');
    
    if(storedUser == login_Info.username && storedPass == login_Info.password){
        alert("Successfully Logged In!");
    }else{
        alert("Invalid Login, Try Again");
    }

}

function saveNewUser(login_Info){

    var givenUsername = login_Info.username;
    var givenPassword = login_Info.password;

    if(givenUsername.length == 0 || givenUsername.length > 8){
        alert("Invalid Username");
    }else if(givenPassword.length == 0 || givenPassword.length > 8){
        alert("Invalid Password");
    }else{

        localStorage.setItem("Users", givenUsername);
        localStorage.setItem("Passwords", givenPassword);
    }
}

function reserveTable(Name, Phone, Email, Date, Time, guestNum){

}

class table{
    
}

