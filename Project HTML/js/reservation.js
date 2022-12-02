const db = require("./db_connection");

(function() {
    console.log('asdad')
});


module.exports = {
    addBooking: function(ppl, res) {

        let allTablesMap = new Map();

        let callbackAllTables = function(err, results, fields) {
            // console.log('gotcha again!');
            // console.log(results);

            console.log('before for loop');
            for(var i = 0 ; i<results.length ; i++) {
                let item = results[i];

                let entry = allTablesMap.get(item.capacity);
                if(entry) {
                    entry.push(item.table_number);
                } else {
                    allTablesMap.set(item.capacity, []);
                    allTablesMap.get(item.capacity).push(item.table_number);
                }
                console.log('inside for loop');
            }
            console.log('after for loop');
            let tablesInUse = findTable(allTablesMap, ppl);
            if(!tablesInUse) {
                res.redirect('./reservation?tables_booked=No Reservations Available!');
                return;
            }
            db.runQuery('UPDATE restaurant_table set vacant=0 where table_number IN ('+ tablesInUse + ')')

            tablesInUse.sort(function(a, b) {
                return a - b;
              });

            res.redirect('./reservation?tables_booked=' + tablesInUse);
            
        }
        this.getAllAvailableTables(callbackAllTables);

    },

    getAllAvailableTables: function(callback) {
        console.log('getting all tables..');
        db.runQuery('select * from restaurant_table where vacant = 1', callback);
    }

 };

 function findTable(mapOfAvailableTables, capacity, res) {
    let tableIdsInUse = [];

    while(capacity >=1) {
        if(capacity >= 8) {

            let largestTableAvailable = Array.from(mapOfAvailableTables.keys()).pop()
            if(!largestTableAvailable) {
                return;
            }
            let tables = mapOfAvailableTables.get(largestTableAvailable);
            let tableId = tables[0];
            tableIdsInUse.push(tableId);
            tables.shift(0);
            capacity-=largestTableAvailable;
            if(mapOfAvailableTables.get(largestTableAvailable).length ==0) {
                mapOfAvailableTables.delete(largestTableAvailable);
            }
        }  
        else {
            if(isEvenNumber(capacity)) {
                let tables = mapOfAvailableTables.get(capacity);
                let largestTableAvailable = capacity;
                if(!tables) {
                    largestTableAvailable = Array.from(mapOfAvailableTables.keys()).pop()
                    tables = mapOfAvailableTables.get(largestTableAvailable);
                }

                if(!tables) return;
                let tableId = tables[0];
                if(tableId) {
                    tableIdsInUse.push(tableId);
                    tables.shift(0);
                }
                
                
                if(mapOfAvailableTables.get(capacity) && mapOfAvailableTables.get(capacity).length == 0) {
                    mapOfAvailableTables.delete(capacity);
                }
                capacity-=largestTableAvailable;
            } else {
                capacity++;
            }
        }

    }
    console.log(mapOfAvailableTables);
    console.log('======================');
    console.log(tableIdsInUse);
    return tableIdsInUse;
}

function isEvenNumber(number) {
    //check if the number is even
    if(number % 2 == 0) {
        return true;
    }
    // if the number is odd
    else {
        return false;
    }
}


