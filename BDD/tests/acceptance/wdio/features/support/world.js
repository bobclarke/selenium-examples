try {

    var expect = require('chai').expect;
    var assert = require('chai').assert;
    var config = require('./config');

    var yaml = require('js-yaml');
    var fs = require("fs");
    var yamlMerge = require('yaml-merge');
    var glob = require("glob");

    //var _ = require('lodash');
    var objYaml = null;
    var objData = null;


    var customCommand = require('./WaitForElemReady')();
    browser.addCommand('waitForElemReady', customCommand);

    //var dataSelectors = yaml.load(fs.readFileSync('tests/acceptance/wdio/locators/common/ElementLocators.yml'));

    var World = function World() {

        this.assert = assert;
        this.expect = expect;
        this.client = browser;

        this.config = config;
        this.config.serverUrls = global.browser.options.serverUrls;
        this.config.loginCredentials = global.browser.options.loginCredentials;
        this.config.getCharacterFromCount = global.browser.options.getCharacterFromCount;
        this.config.brandToTest = global.browser.options.brandToTest;
        this.config.productToTest = global.browser.options.productToTest;
        this.config.capabilities = global.browser.options.capabilities;
        //Performance
        this.config.performanceOptions = global.browser.options.performanceOptions;

        this.TIMEOUT_CONST = 30000;
        this.client = browser;
        // this.client.timeoutsAsyncScript(15000);
        this.client.timeoutsImplicitWait(20000);
        this.client.timeouts('pageLoad', 30000);
        this.pause = 7500;
        this.miniPause = 2000;




        //Transfer Promises
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');

        chai.Should();
        chai.use(chaiAsPromised);
        chaiAsPromised.transferPromiseness = this.client.transferPromiseness;

        if (objData=== null) {

            objData = yaml.load(fs.readFileSync('tests/acceptance/wdio/files/testData/Environment1'));
        }

        function getData(field) {

            var dataValue = objData[field];
            return dataValue;
        }


        this.getData = function (field) {
            var dataValue = objData[field];
            return dataValue;
        };



        if (objYaml === null) {

            glob("tests/acceptance/wdio/locators/common/*.yml", function (er, files) {
                objYaml = yamlMerge.mergeFiles(files);
            });
        }



        function getSelector(field) {

            var dataSelector = objYaml[field];
            return dataSelector;
        }


        function getSelector(field) {
            // var dataSelector = (field.indexOf(' ') > -1) ? '[data-selector*="' : '[data-selector="';
            var dataSelector = '[data-selector="';

            if(config.lookups[field]) {
                dataSelector = config.lookup.s[field];
            }
            else if(objYaml[field]) {
                dataSelector = objYaml[field];
            }
            else {
                dataSelector = field;
            }
            return dataSelector;
        }

        this.getSelector = function (field) {
            // return  this.getSelector(field);
            return processSelector(field);
        };

        this.getTodaysDate = function () {
            var currentDate = new Date();
            return [('0' + (currentDate.getDate())).slice(-2), ('0' + (currentDate.getMonth() + 1)).slice(-2), currentDate.getFullYear()].join('/');
        };



        this.createRandomString = function () {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
                randomString = '',
                rnum;

            for (var i = 0; i < 5; i++) {
                rnum = Math.floor(Math.random() * chars.length);
                randomString += chars.substring(rnum, rnum + 1);
            }
            return randomString;
        };

        function processSelector(selector) {
            /* var combinedSelector = '';
             //var subSelectors = selector.replace(/\s/ig, '');
             //subSelectors = subSelectors.replace('.', ' ');
             var subSelectors = selector.split('|');
             for (var i = 0; i < subSelectors.length; i++) {
             var resolvedSelector = getSelector(subSelectors[i]);
             if (resolvedSelector.indexOf('|') > -1) {
             combinedSelector += processSelector(resolvedSelector);
             }
             else {
             combinedSelector += resolvedSelector + ' ';
             }
             }*/
            var combinedSelector = getSelector(selector);
            //new lines

            return combinedSelector;
        }

        //callback();
    };

    exports.World = World;
}

catch(err){
    console.log('Error found in world.js File');
    console.log(err);
}
