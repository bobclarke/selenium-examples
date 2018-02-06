/**
 * Created by hbora on 6/29/17.
 */
var gulp = require('gulp');
//var webdriver = require('gulp-webdriver');
var selenium = require('selenium-standalone');

var plugins = {
    path: require('path'),
    wdio: require('core-cucumber-bdd'),
    exec: require('child_process').exec
};


var seleniumServer;
gulp.task('selenium', function () {

    console.log("FWC GULP >>> running selenium task")
    console.log("FWC GULP >>> running selenium-server-standalone-jar with command: " + command);

    var Chromeexecutable = 'node_modules/chromedriver/bin/chromedriver';
    var command = 'java -jar node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar -log seleniumLog.txt -Dwebdriver.chrome.driver=' + plugins.path.resolve(__dirname, Chromeexecutable);

    seleniumServer = plugins.exec(command, function() {
        seleniumServer = null;
    });
});

gulp.task('runTestsWithSauce', function() {
    return gulp.src('tests/acceptance/wdio/conf/cuke.conf.js')
        .pipe(plugins.wdio({
         wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', 'wdio')
    }));
});

gulp.task('runTestOnLocal', ['selenium'], function () {
    return gulp.src('tests/acceptance/wdio/conf/cuke.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', 'wdio')
        }));
});


gulp.task('runTestsWithZap', function () {
    return gulp.src('tests/acceptance/wdio/conf/wdio_zap.conf.js')
        .pipe(plugins.wdio({
            wdioBin: plugins.path.join(__dirname, 'node_modules', '.bin', 'wdio')
        }));
});

