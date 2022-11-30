const db = require("./db_connection");

module.exports = {
    addBooking: function(ppl) {

        var map = new Map();

        while(ppl > 0) {
            if(ppl >= 8) {
                if(map.get(8)) {
                    map.set(8, map.get(8) + 1);
                } else {
                    map.set(8, 1);
                }
            }
            ppl = ppl - 8;
            console.log(map);
        }
    },

    findTable: function(capacity) {
        console.log('finding table..');

        var res = db.runQuery('SELECT table_number as t from restaurant_table where capacity=' + capacity + ' LIMIT 1');

        console.log(res);

        // db.runQuery('SELECT table_number as t from restaurant_table where capacity=' + capacity + ' LIMIT 1', function (error, results, fields) {
        //     if (error) throw error;
        //     console.log('asfjksajfkla');
        //     console.log(results.RowDataPacket[0]);
        //     console.log('asfjksajfkla');
        // });
    }

 };