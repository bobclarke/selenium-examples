var jsonLib = require('core-cucumber-bdd/src/support/libs/json/_jsonLib');
var cassandraLib = require('core-cucumber-bdd/src/support/libs/cassandra/_cassandraLib');
var kafkaLib = require('core-cucumber-bdd/src/support/libs/kafka/_kafkaLib');
var configPath = require('../../conf/api.conf.js');
var moment = require('moment');

var self = module.exports = {

    //Wrapper function to call 'getCassandraData' function from core-cucumber-bdd
    getCassandraData: function (query) {
        var contactPoint = configPath.config.cassandraConnection.contactPoints;
        var keyspace = configPath.config.cassandraConnection.keyspace;
        return cassandraLib.getCassandraData(query,contactPoint,keyspace);
    },

    //Wrapper function to call 'replaceKeys' function from core-cucumber-bdd
    replaceKeys: function (JsonData,keyNames){
        var columnMappingFolderPath = configPath.config.columnMappingFolderPath;
        return jsonLib.replaceKeys(JsonData,keyNames,columnMappingFolderPath);
    },

    //Wrapper function to call 'flumeDataToKafka' function from core-cucumber-bdd
    flumeDataToKafka: function (data,remoteFolder){
        var remoteFolderToSend = configPath.config.kafkaTopics.flumeLocation+remoteFolder;
        var dataFolder = configPath.config.expectedResponseFolderPath+'/kafka/';
        kafkaLib.flumeDataToKafka(data,remoteFolderToSend,dataFolder);
    },

    //Wrapper function to call 'producerKafka' function from core-cucumber-bdd
    producerKafka: function (message,topic){
        var hostUrl = configPath.config.kafkaTopics.hostUrl;
        var partitions = configPath.config.kafkaTopics.partitions;
        kafkaLib.producerKafka(message,topic,hostUrl,partitions);
    },

    //Wrapper function to call 'consumerKafka' function from core-cucumber-bdd
    consumerKafka: function (topic, pKey){
        var hostUrl = configPath.config.kafkaTopics.hostUrl;
        kafkaLib.consumerKafka(topic,hostUrl,pKey);
    },




    //this function compares two JSONs (Cassandra vs EnterpriseAPI)
    //after mapping and filtering the fields 'flds' of the JSON
    compareApiResponseWithCassandra: function (flds,cassandra,enterpriseApi) {
        var fields = [];
        fields = self.convertDataTableIntoArray(flds);
        var result;
        var mappedCassandraResults = self.replaceKeys(cassandra, fields);
        var filteredCassandraResults = jsonLib.getFilteredJsonFields(mappedCassandraResults, fields);
        result = jsonLib.compare(filteredCassandraResults, 'Cassandra', enterpriseApi, 'Enterprise API');
        return result;

    },

    //this function compares two JSONs (Cassandra vs CoreAccounting)
    //after mapping and filtering the fields 'flds' of the JSON
    compareCassandraResponseWithSource: function (flds,coreAccounting,cassandra) {
        var fields = [];
        fields = self.convertDataTableIntoArray(flds);
        var result;
        var mappedCassandraResults = self.replaceKeys(cassandra, fields);
        var filteredCassandraResults = jsonLib.getFilteredJsonFields(mappedCassandraResults, fields);
        var mappedCoreAccountingResults = self.replaceKeys(coreAccounting, fields);
        var filteredCoreAccountingResults = jsonLib.getFilteredJsonFields(mappedCoreAccountingResults, fields);
        result = jsonLib.compare(filteredCoreAccountingResults, 'Source Systems', filteredCassandraResults, 'Cassandra');
        return result;

    },

    // Converts the timestamp from DD-MM-YYYYTHH:MM:SSC format to DD-MM-YYYY HH:MM:SS format
    formatTimestamp: function(data,field){

        if(data instanceof Array){
            for(var i=0;i<data.length;i++){
                data[i][field] = new Date(data[i][field]).toJSON();
            }
        }
        else{
            data[field] = new Date(data[field]).toJSON();
        }

        return data;
    },

    // Checking the difference of two Timestamp in seconds
    checkTimeStampDifference: function (finalTimeStamp,initialTimeStamp, timeInSeconds){
        if (finalTimeStamp > initialTimeStamp) {
            var errorMessage;
            var diff = moment(finalTimeStamp).diff(moment(initialTimeStamp), 'seconds');
            if(diff < timeInSeconds)
                return [true, 'Passed'];
            else
                errorMessage = '\n The time difference between the Timestamps is more than the specified limit of ' + timeInSeconds + ' seconds\n'
            return [false, errorMessage];
        }
        else
            errorMessage = '\n The Final Time Stamp is less than the Initial Time Stamp\n'
        return [false, errorMessage];
    },

    // Checking blank and not null condition for the value of every field
    checkBlankAndNotNull: function (json, fields) {
        var result=true;
        var message=[];
        for (var i = 0; i < fields.length; i++) {
            var fieldValue = jsonLib.getValueOfKey(json, fields[i]);
            if (fieldValue == '' || fieldValue == null) {
                message.push(fields[i]);
            }
        }
        if(message.length!=0) {
            result = false;
        }
        var errorMessage = '\n Values of ' + message + ' is blank or null\n'
        return [result, errorMessage];
    },

    // Converting data table into array
    convertDataTableIntoArray: function (flds) {
        var fieldsTemp = flds.raw();

        var fields = [];
        for (var i = 0; i < fieldsTemp.length; i++) {
            fields[i] = fieldsTemp[i][0];
        }
        return fields;
    },

    //this function reads the file, increments its data's identifier value by 1,
    // updates the set of fields provided in 'updateFields' json with the corresponding value mentioned in the json
    //and then places the file to kafka location
    readFileIncrementIDAndUpdateFields: function (dataFolder,fileName,primaryKey,updateFields,flumeLocation) {
        var data = jsonLib.readFileData(dataFolder,fileName);
        var primaryKeyValue = jsonLib.getValueOfKey(data,primaryKey);
        data = jsonLib.changeKeyValue(data,primaryKey,++primaryKeyValue);
        jsonLib.writeIntoFile(dataFolder,fileName,data);

        var fields = Object.keys(updateFields);
        for(var i=0; i < fields.length;i++){
            data = jsonLib.changeKeyValue(data, fields[i], updateFields[fields[i]]);
        }
        self.flumeDataToKafka(data,flumeLocation);
        return data;
    },

    //this function reads the file, increments its data's identifier value by 1,
    // updates the field's value to 'value' and then places the file to kafka location
    readFileIncrementIDAndChangeFieldValue: function (dataFolder,fileName,primaryKey,field,value,flumeLocation) {
        var data = jsonLib.readFileData(dataFolder,fileName);
        var primaryKeyValue = jsonLib.getValueOfKey(data,primaryKey);
        data = jsonLib.changeKeyValue(data,primaryKey,++primaryKeyValue);
        jsonLib.writeIntoFile(dataFolder,fileName,data);
        data = jsonLib.changeKeyValue(data, field, value);
        self.flumeDataToKafka(data,flumeLocation);
        return data;
    },

    //this function reads the file, updates the set of fields provided in 'updateFields' json with the corresponding value mentioned in the json
    //and then places the file to kafka location
    readFileAndChangeKeysValue: function (dataFolder,fileName,updateFields,flumeLocation) {
        var data = jsonLib.readFileData(dataFolder,fileName);

        var fields = Object.keys(updateFields);
        for(var i=0; i < fields.length;i++){
            data = jsonLib.changeKeyValue(data, fields[i], updateFields[fields[i]]);
        }
        self.flumeDataToKafka(data,flumeLocation);
        return data;
    },

    //this function reads the file, updates the field's value to 'value' and then places the file to kafka location
    readFileAndChangeFieldValue: function (dataFolder,fileName,field,value,flumeLocation) {
        var data = jsonLib.readFileData(dataFolder,fileName);
        data = jsonLib.changeKeyValue(data, field, value);
        self.flumeDataToKafka(data,flumeLocation);
        return data;
    },


    //this function reads the file, increments its data's identifier value by 1 and then places the file to kafka location
    readFileAndIncrementID: function (dataFolder,fileName,primaryKey,flumeLocation) {
        var data = jsonLib.readFileData(dataFolder,fileName);
        var primaryKeyValue = jsonLib.getValueOfKey(data,primaryKey);
        data = jsonLib.changeKeyValue(data,primaryKey,++primaryKeyValue);
        jsonLib.writeIntoFile(dataFolder,fileName,data);
        self.flumeDataToKafka(data,flumeLocation);
        return data;
    },


    //this function reads the file, removes the 'field' from the json and then places the file to kafka location
    readFileAndRemoveField: function (dataFolder,fileName,primaryKey,field,flumeLocation) {
        var data = jsonLib.readFileData(dataFolder,fileName);
        var primaryKeyValue = jsonLib.getValueOfKey(data,primaryKey);
        data = jsonLib.changeKeyValue(data,primaryKey,++primaryKeyValue);
        jsonLib.writeIntoFile(dataFolder,fileName,data);
        data = jsonLib.removeKey(data,field);
        self.flumeDataToKafka(data,flumeLocation);
        return data;
    }


}