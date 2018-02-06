try {

    var world = require('../../support/world.js').World;
    var navigationPages = require('../../../lib/navigationPage');

    var navigationSteps1 = function () {

        this.World = world;
        // These are to save brand and product values for all steps of a scenario
        // Each scenario should set brand and product value in Given statement else
        // Brand and product value from last scenario will be used
        var brand;
        var product;


        //navigate to URL
        this.Given(/^.*navigate to \"(.*)\".*$/, function (url) {

            return navigationPages.navigateWithMaximiseWindow(url, this, this);
        });

        //refresh the page
        this.When(/^.*refresh the page.*$/, function () {

            return navigationPages.pageRefresh(this, this);
        });

        //press back button on the page
        this.When(/^.*press back button.*$/, function () {

            return navigationPages.pressBackButton(this);
        });

        // Close Browser Page
        this.When(/^.*close the page.*$/, function () {

            return navigationPages.pageClose(this);
        });

        //not sure why it's not pointing to it
        this.Given(/^.*wait (\d+) seconds?.*$/, function (seconds) {
            console.log("waiting for seconds =" + seconds);

            return navigationPages.waitInMilliSec(seconds, this, this);
        });

        //close the last opened window of the browser
        this.Then(/^.*close the Last opened window.*$/, function () {

            return navigationPages.closeLastOpenedWindow(this);
        });

        //not sure of this function
        this.Then(/^a new (window|tab) has (not)* been opened$/, function (type, falseCase) {

            return navigationPages.openNewWindow(type, falseCase, this);
        });

        //navigate to URL and maximise browser window
        this.Given(/^.*navigate to URL \"(.*)\".*$/, function (url) {

            return navigationPages.navigateWithMaximiseWindow(url, this, this);
        });

        //navigate to specific page and brand
        this.When(/^.*navigate .*\"(.*)\".* page for brand .*\"(.*)\".*$/, function (page, brand) {

            return navigationPages.brandwiseNavigation(page, brand, this, this);
        });

        // navigate to page with pageTitle (custom @Amit)
        this.When(/^.*land on .*\"(.*)\".* page.*$/, function (page) {


            return navigationPages.verifyPageTitle(page, this);
        });

        this.When(/^.*navigate .*\"(.*)\".* component for brand .*\"(.*)\".* and mode.*\"(.*)\".*$/, function (component, brand, mode) {

            return navigationPages.brandwiseNavigation1(component, brand, mode, this, this);
        });

        //navigate to specific page and brand
        this.When(/^.*navigate to anchored link with anchor .*\"(.*)\".* for .*\"(.*)\".* component .*\"(.*)\".* and mode.*\"(.*)\".*$/, function (appendStr, component, brand, mode) {

            //return navigationPages.publishedAnchoredNavigation(appendStr, page, brand, this, this);
            return navigationPages.brandwiseNavigationAppendStr(appendStr, component, brand, mode, this, this);

        });

    };
    module.exports = navigationSteps1;
}
catch (err) {
    console.log('Unable to find world....');
}
