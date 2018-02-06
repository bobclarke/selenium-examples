//********* User Defined Config Variables - Start *********//

var ff;
var featureFilePath;
var argv = require('yargs').argv;
var apiEndpoint = require('../endpoints/apiEndpoints.js');

const branch = 'master';

//To create feature file path - If any feature file name is passed with --ff tag while initiating suite then only that ff is executed
if (argv.ff){
    featureFilePath = 'tests/acceptance/wdio/features/featureFiles/api/' + argv.ff + '.feature';
}
else{
    featureFilePath = 'tests/acceptance/wdio/features/featureFiles/api/*.feature';
}


exports.config = {

    brandToTest: {
        brandName: ''
    },
    productToTest: {
        productName: ''
    },

    cassandraConnection:{
        contactPoints: '10.1.1.10:9042',
        keyspace: 'ob_dev'
    },

    kafkaTopics:{
        hostUrl: '10.1.1.10:2181',
        partitions: '1',
        flumeLocation: 'userName:Password@10.113.32.154:22:/usr/hdp/2.4.3.0-227/flume/obdata/'
    },


    apiEndpointPath: apiEndpoint.getEndpoint('local'),
    expectedResponseFolderPath: 'tests/acceptance/wdio/files/expectedResponseFiles/',
    queryMappingFolderPath: 'tests/acceptance/wdio/files/queries/cassandraQueries.yml',
    columnMappingFolderPath: 'tests/acceptance/wdio/files/dataMappingFiles/mapping.yml',
    jsonRequestFolderPath: 'tests/acceptance/wdio/files/requestJsonFiles/',
    xmlFolderPath: 'tests/acceptance/wdio/files/requestXmlFiles/',
    schemaFolderPath: 'tests/acceptance/wdio/files/schemaFiles/',
    swaggerFolderPath: 'tests/acceptance/wdio/files/swaggerFiles/',
    dataMappingFolderPath: 'tests/acceptance/wdio/files/dataMappingFiles/',

// =====================
// Server Configurations
// =====================

    defaultTags: ['~@descoped', '~@manual','~@wip', '~@mocks'],
// ==================
// Specify Test Files
// ==================

    specs: [
        featureFilePath
    ],

    maxInstances: 1,
    sync: false,


    framework: 'cucumber',
    reporters: ['spec'],
    reporterOptions: {
        outputDir: 'tests/acceptance/wdio/utilities/output/'
    },

// If you are using Cucumber you need to specify where your step definitions are located.
    cucumberOpts: {
        timeout: 20000,
        require: ['tests/acceptance/wdio/features/step_definitions/', 'tests/acceptance/wdio/features/support/'],
        ignoreUndefinedDefinitions: false,
        format: 'json'
    },
    logLevel: 'silent',
    coloredLogs: true
};
