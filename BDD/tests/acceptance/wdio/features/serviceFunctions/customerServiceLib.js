var yaml = require("js-yaml");
var configPath = require('../../conf/api.conf.js');

var JSONPath = require('advanced-json-path');

module.exports = {

    //This function will concatenate the value of the keys specified in the array 'valueKeys', store it against the
    // key provided in parameter 'key' and return the updated JSON object 'data'
    concatenateKeys: function (data,key, valueKeys) {
        var value = [];
        var valueKeysList = valueKeys.split(',');

        //if JSON data is an array then loop through the records and repeat for all of them
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                //loop over the list of keys and read their value
                for (j = 0; j < valueKeysList.length; j++) {
                    value[j] = JSONPath(JSON.parse(JSON.stringify(data[i])), '$..' + valueKeysList[j]);
                }

                //store the value of the array in the provided key
                data[i][key] = value;
            }
        }

        else {
            for (j = 0; j < valueKeysList.length; j++) {
                value[j] = JSONPath(JSON.parse(JSON.stringify(data)), '$..' + valueKeysList[j]);
            }
            data[key] = value;
        }

        return data;

    }
}