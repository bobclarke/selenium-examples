
var Page = require('./Page');
var actionPages = require('../../../lib/actionPage');
try{

// var world = require('../support/world.js').World;
    var dragAndDrop = require('html-dnd');

    var actionSteps1 = function() {

        //Accept the alert
        this.When(/^.*accept.*\"(.*)\".*$/, function (arg1, selector) {
            return actionPages.acceptAlert(selector, this);
        });

        //Gherkin-And I dismiss the alert
        this.When(/^.*dismiss.*\"(.*)\".*$/, function (arg1, selector) {
            return actionPages.dismissAlert(selector, this);
        });

        //Select a Checkbox
        this.When(/^.*select .*\"(.*)\".* checkbox.*$/, function (selector) {
            return actionPages.selectCheckBox(selector, this);
        });

        //close any open dialog box
        this.Then(/^.*close .* dialog.*$/, function () {
            return actionPages.closeOpenDialogBox(this);
        });

        this.Then(/^.*confirmation dialog .*(.*).*$/, function (message) {

            return actionPages.confirmationDialogExist(this);
        });

        this.Then(/^.*warning dialog .*(.*).*$/, function (message) {
            return actionPages.warningDialogExist(this);

        });

        this.Then(/^.*dismiss dialog.*$/, function() {

            return actionPages.dismissDialog(this);
        });

        this.Then(/^.*accept alert.*$/, function() {

            return actionPages.acceptDialogByReloding(this);
        });

        this.When(/^.*pause.*(\d+)ms.*$/,function(ms) {

            return actionPages.pauseInMillisec(ms,this, this);
        });

        this.When(/^.*press.*\"(.*)\".*(key|keys).*$/,function(keysequence) {

            return actionPages.concatenatedKeyActions(keysequence, this);
        });

        this.When(/^.*press Browser BACK key.*$/,function(keysequence) {
    
          return actionPages.browserBack(this);
        });

        this.When(/^.*left-click.*\"(.*)\".*$/,function(selector) {
  
          return actionPages.clickWithAction(selector, this);
        });
    
        this.When(/^.*enter.*random keys.*"([^"]*)" in "([^"]*)".*$/, function (randomString, selector) {

            return actionPages.randomStringCreator(randomString, selector, this);
        });

        this.Then(/^.*scroll to element.*"([^"]*)".*$/, function (selector) {

            return actionPages.scroll(selector, this);

        });

        this.Then(/^.*open link.*"([^"]*)".* in new tab.*$/, function (selector) {

            return actionPages.openLinkInNewTab(selector, this);

        });

        this.Then(/^.*drag .*"([^"]*)" to "([^"]*)".*$/, function (sDraggable, sDroppable, next) {

            return actionPages.dragAndDrop(sDraggable, sDroppable, this, this);
        });

        this.When(/^.*step into iframe.*\"(.*)\".*$/, function(selector){

            return actionPages.stepIntoFrame(selector, this);
        });

        this.When(/^.*step into frame using id.*\"(.*)\".*$/, function(selector){

            return actionPages.stepIntoFrameUsingId(selector, this);
        });

        this.When(/^.*step out.*iframe.*$/, function(){

            return actionPages.stepOutOfFrame(this);
        });

        this.When(/^.* click.*\"(.*)\".*$/, function (selector) {


            return actionPages.clickWithSmartWait(selector, this, this);
        
        });

        //project specific method
        //click by offset
        this.When(/^.* go over.*\"(.*)\".* by offset.*\"(\d+)\".* and .*\"(\d+)\".*$/, function (selector, x, y) {

            return actionPages.clickByOffset(selector, x, y, this, this);

        });

        this.When(/^.*login.*CRX.*\"(.*)\".* credentials.*$/, function(userRole) {

            return actionPages.CRXLogin(userRole, this);
        });

        this.When(/^.*double-click.*\"(.*)\".*$/, function (selector){

            return actionPages.doubleClick(selector, this);
        });

    };

    module.exports = actionSteps1;
}

catch (err){
    console.log('Error in actionSteps.js File');
    console.log(err);
}
