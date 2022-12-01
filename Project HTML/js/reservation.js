const db = require("./db_connection");

module.exports = {
    addBooking: function(ppl) {


        let allTablesMap = new Map();
        let tablesToUse = new Map();

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
            db.runQuery('UPDATE restaurant_table set vacant=0 where table_number IN ('+ tablesInUse + ')')
        }
        this.getAllAvailableTables(callbackAllTables);

        // console.log(allTables)

        // if(ppl >= 8) {

        // }

    },

    getAllAvailableTables: function(callback) {
        console.log('getting all tables..');
        db.runQuery('select * from restaurant_table where vacant = 1', callback);
    }

 };

 function findTable(mapOfAvailableTables, capacity) {
    let tableIdsInUse = [];

    while(capacity >=1) {
        if(capacity >= 8) {

            let largestTableAvailable = Array.from(mapOfAvailableTables.keys()).pop()
            if(!largestTableAvailable) {
                throw Error("can't fucking do it!");
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
                let tableId = tables[0];
                tableIdsInUse.push(tableId);
                tables.shift(0);
                if(mapOfAvailableTables.get(capacity) && mapOfAvailableTables.get(capacity).length == 0) {
                    mapOfAvailableTables.delete(capacity);
                }
                capacity-=largestTableAvailable;
            } else {
                capacity++;
            }
        }
        // else {
        //     if(isEvenNumber(capacity)) {
        //         let tables = mapOfAvailableTables.get(capacity);
        //         if(!tables) {
        //             break;
        //         }
        //         let tableId = tables[0];
        //         tableIdsInUse.push(tableId);
        //         tables.shift(0);
        //         capacity-=capacity;
        //     } else {
        //         capacity++;
        //     }
        // }
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