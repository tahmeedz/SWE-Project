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

function registerUser(login_Info){

    var givenUsername = login_Info.username;
    var givenPassword = login_Info.password;

    //add condition to check if the user already exists

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
    if(guestNum >= 20){
        alert("Too many guests!");
    }
    
}


class table{
    constructor(isVacant = false, numSeats = 0, Name = "null", Phone = "null", Email = "null", Date = "null", Time = "null"){
        this.isVacant = isVacant;
        this.numSeats = numSeats;
        this.Name = Name;
        this.Phone = Phone;
        this.Email = Email;
        this.Email = Email;
        this.Date = Date;
        this.Time = Time;
    }

    getVacancy(){
        return this.isVacant;
    }
    getNumSeats(){
        return this.numSeats;
    }
    getName(){
        return this.Name;
    }
    getPhone(){
        return this.Phone;
    }
    getEmail(){
        return this.Email;
    }
    getDate(){
        return this.Date;
    }
    getTime(){
        return this.Time;
    }
}


class allTables{
    constructor(){
        this.tables = []
    }
    newTable(isVacant, numSeats, Name, Phone, Email, Date, Time){
        let x = new table(isVacant, numSeats, Name, Phone, Email, Date, Time)
        this.tables.push(x);
        return x;
    }

    getAllTables(){
        return this.tables;
    }
}

let Tables = new allTables;
Tables.newTable(numSeats = 2);
Tables.newTable(numSeats = 4);
Tables.newTable(numSeats = 6);
Tables.newTable(numSeats = 8);


