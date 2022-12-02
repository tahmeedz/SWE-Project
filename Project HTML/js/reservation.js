const db = require("./db_connection");

(function() {
    console.log('asdad')
});


module.exports = {
    addBooking: function(ppl, res) {

        let allTablesMap = new Map();

        let callbackAllTables = function(err, results, fields) {

            for(var i = 0 ; i<results.length ; i++) {
                let item = results[i];
                let capacityy = parseInt(item.capacity);
                let entry = allTablesMap.get(capacityy);
                if(entry) {
                    entry.push(item.table_number);
                } else {
                    allTablesMap.set(capacityy, []);
                    allTablesMap.get(capacityy).push(item.table_number);
                }
            }
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

    capacity = parseInt(capacity);

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
                
                capacity-=largestTableAvailable;
                if(mapOfAvailableTables.get(capacity) && mapOfAvailableTables.get(capacity).length == 0) {
                    mapOfAvailableTables.delete(capacity);
                }
                
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


