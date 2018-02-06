//********* User Defined Config Variables - Start *********//

var ff;
var featureFilePath;
var argv = require('yargs').argv;

const branch = 'master';

const browser = 'chrome';

//Port on which Selenium instance is running - Should be 4444 for local run, 4445 for Sauce run , 4723 for local Appium run against real devices
var port = '4445';
var host = '127.0.0.1';
const instances = 1;


//To create feature file path - If any feature file name is passed with --ff tag while initiating suite then only that ff is executed
if (argv.ff) {
    featureFilePath = 'tests/acceptance/wdio/features/featureFiles/web/' + argv.ff + '.feature';
}
else {
    featureFilePath = 'tests/acceptance/wdio/features/featureFiles/web/*.feature';
}

function getUrls() {
    return {
        Google: 'http://' + 'www.google.com/',
        Colleague_Toolkit: 'http://' + 'localhost:9001/accounts',

    };
}

function getCredentials() {
    return {
        'admin': {
            userName: 'admin',
            password: 'admin'
        },
        'others': {
            userName: 'test12345',
            password: 'test12345'
        }
    };
}

exports.config = {
        serverUrls: getUrls(),

        user: 'bobclarke',
        key: '*****',

        //loginCredentials: getCredentials(),

        brandToTest: {
            brandName: ''
        },
        productToTest: {
            productName: ''
        },


        defaultTags: ['~@descoped', '~@manual', '~@wip', '~@mocks', '@Demo'],
        host: host,
        port: port,
        path: '/wd/hub',

        specs: [
            featureFilePath
        ],

        maxInstances: instances,
        sync: false,


        capabilities: [{
                'browserName': browser,
                ignoreProtectedModeSettings: true,
                'tunnel-identifier' : 'my_tunnel_identifyer'
            }
        ],
        
        framework: 'cucumber',
        reporters: ['spec'],
        reporterOptions: {
            outputDir: 'tests/acceptance/wdio/utilities/output/'
        },
        cucumberOpts: {
            timeout: 40000,
            require: ['tests/acceptance/wdio/features/step_definitions/', 'tests/acceptance/wdio/features/support/'],
            ignoreUndefinedDefinitions: true,
            format: 'json'
        },
        logLevel: 'silent',
        coloredLogs: true
};

