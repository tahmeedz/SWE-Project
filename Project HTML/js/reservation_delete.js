const reservationForm = document.getElementById("reservation-form");

reservationForm.addEventListener("submit", reservation);


function reservation(event) {
    console.log('awais!');
    event.preventDefault();

    const name = event.target[0].value;
    const phoneNumber = event.target[1].value;
    const email = event.target[2].value;
    const date = event.target[3].value;
    const time = event.target[4].value;
    const numOfPpl = event.target[5].value;
    const creditCardNum = event.target[6].value;
    const creditCardName = event.target[7].value;
    const creditCardExpMonth = event.target[8].value;
    const creditCardExpYear = event.target[9].value;
    const tableSettings = JSON.parse(window.localStorage.getItem("tables"));

    const dateObj = new Date(date);
    let formValid = true;

    if (dateObj.getDay() === 5 || dateObj.getDay() === 6 || (dateObj.getMonth() === 11 && dateObj.getDate() >= 23)) {
        if (!(creditCardNum && creditCardName && creditCardExpMonth && creditCardExpYear)) {
            formValid = false;
        }
    }

    if (formValid) {
        const table = tableSettings.find(table => parseInt(table.value) >= parseInt(numOfPpl) && !table.booked);
        let tables = [];
            
        if(!table) {
            tableSettings.forEach(aTable => {
                if (tables.length < 1 && !aTable.booked) {
                    tableSettings.forEach(bTable => {
                        if (tables.length < 1 && bTable !== aTable && !bTable.booked && parseInt(aTable.value) + parseInt(bTable.value) >= parseInt(numOfPpl)) {
                            aTable.booked = true;
                            bTable.booked = true;
                            tables = [aTable, bTable];
                        }
                    })
                }
            });
        } else {
            table.booked = true;
        }
    
        if (table || tables.length > 0) {
            window.localStorage.setItem("tables", JSON.stringify(tableSettings));

            addBooking({
                name,
                phoneNumber,
                email,
                date,
                time,
                numOfPpl,
                creditCardNum,
                creditCardName,
                creditCardExpMonth,
                creditCardExpYear
            })
        
            window.location.href = "success.html";
        } else {
            document.getElementById("error-msg").innerHTML = "Can't find tables."
        }
    } else {
        document.getElementById("error-msg").innerHTML = "Enter valid card information."
    }
}

