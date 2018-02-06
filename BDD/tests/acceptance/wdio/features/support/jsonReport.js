var Cucumber = require('cucumber');
fs = require('fs-extra');
var JsonFormatter = Cucumber.Listener.JsonFormatter();

module.exports = function JsonOutputHook() {
    var currenttime = new Date().toJSON().replace(/:/g, "-");
    var AbsreportPath = 'tests/acceptance/wdio/utilities/output/report'+currenttime+'.json';
    JsonFormatter.log = function (json) {
        fs.writeFileSync(AbsreportPath, json, null, 2);
        console.log('Run Complete: json report file location: ' + AbsreportPath);
    };
    this.registerListener(JsonFormatter);
};
