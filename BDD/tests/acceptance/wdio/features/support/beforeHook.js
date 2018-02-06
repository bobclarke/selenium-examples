/* jslint node: true */
'use strict';

var apiLib = require('core-cucumber-bdd/src/support/libs/api/_apiLib');

module.exports = function() {
    // cleanup before every scenario
    this.Before(function(scenario, callback) {
        console.log('STARTED EXECUTING SCENARIO: '+scenario.getName());
        this.apiLib = new apiLib.apiLib('http', 'httpbin.org');
        callback();
    });
};