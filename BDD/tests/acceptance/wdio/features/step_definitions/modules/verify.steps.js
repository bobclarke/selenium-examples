try {

    var world = new require('../../support/world.js');
    var verifyPageObj = new require('../../../lib/verify.page');
    var navigationPage = new require('../../../lib/navigationPage');

    var verifyStepsAgain = function () {

        //validate content of any element
        this.Then(/^.*content of.*\"(.*)\".* as .*\"(.*)\".*$/, function (selector, expectedValue) {

            return verifyPageObj.verifySelectorContent(selector, expectedValue, this);

        });

        //validate text entered in any input box
        this.Then(/^.*validate text.*input box.*\"(.*)\".* as .*\"(.*)\".*$/, function (selector, expectedValue) {

            return verifyPageObj.verifySelectorText(selector, expectedValue, this)

        });


        this.Then(/^I should see maximum .*\"(.*)\".* suggested search terms displayed in "([^"]*)"$/, function (expectedValue, selector) {


            return verifyPageObj.verifyElementListSize(selector, expectedValue, this);
        });


        // Below Step definition accepts the Data Table and perform following activities:
        // 1. take mouse to desired location
        // 2. read the mouseover content
        // 3. read the expected data from getData function
        // 4. compare two data
        this.Then(/^.*mouseover value|values of .*in tooltip.*$/, function (fields) {
            var fieldsTemp = fields.hashes();
            var currentChain = this;
            var count = 0;
            for (var i = 0; i < fieldsTemp.length; i++) {
                console.log('count attempt: ' + count);
                currentChain = verifyPageObj.verifyMouseOverContent(fieldsTemp[i].helptext_link, fieldsTemp[i].expected_helptext_data, fieldsTemp[i].tooltip_link, currentChain, this);

                count++;
            }
            console.log('count is: ' + count);
            return navigationPage.waitInMilliSec(1, currentChain, this);
        });


        //Verify if CheckBox/Radio Button is checked
        //Gherkin-Then "checkbox/Radio" is checked
        this.When(/^.*\"(.*)\".* is checked.*$/, function (selector) {

            return verifyPageObj.verifyElementChecked(selector, this);

        });

        //Verify if CheckBox/Radio Button is unchecked
        //Gherkin-Then "checkbox/Radio" is unchecked
        this.When(/^.*\"(.*)\".* is unchecked(.*)$/, function (arg1, selector, arg3) {

            return verifyPageObj.verifyElementUnChecked(selector, this);

        });


        //Verify that any button of select-button class is NOT selected
        //Gherkin-I should not see "Field" selected by .default
        this.When(/^.*should not see.*\"(.*)\".* selected.*$/, function (selector) {

            return verifyPageObj.verifyElementNotSelected(selector, this);

        });


        //Verify that any button of select-button class is selected
        //Gherkin-I should not see "Field" selected by default
        this.When(/^.*should see.*\"(.*)\".* selected.*$/, function (selector) {

            return verifyPageObj.verifyElementSelected(selector, this);

        });

        //Check if an element is enabled
        //Gherkin-I should see "element`opdown" as enabled
        this.When(/^.*\"(.*)\".*enabled.*$/, function (arg1, selector, arg3) {

            return verifyPageObj.verifyElementIsEnabled(selector, this);

        });

        //Check if an element is disabled
        //Gherkin-I should see "elementDropdown" as disabled
        this.When(/^.*\"(.*)\".*disabled.*$/, function (arg1, selector, arg3) {

            return verifyPageObj.verifyElementIsDisabled(selector, this);

        });

        //Check if an element exists
        //Gherkin-And I should see "WebElement" exist
        this.When(/^.*should see.*"(.*)".*exist|existed.*$/, function (selector) {

            return verifyPageObj.verifyElementExist(selector, this, this);

        });


        //Check if an element does NOT exist
        //Gherkin-And I should see "WebElement" exist
        this.When(/^.*should not see.*"(.*)".*exist|existed.*$/, function (selector) {

            return verifyPageObj.verifyElementNotExist(selector, this);

        });


        //Check if an element is NOT displayed
        this.When(/^.*should not see .*"(.*)".* being displayed.*$/, function (selector) {

            return verifyPageObj.verifyElementNotDisplayed(selector, this);

        });


        //Check if default value of a field is blank
        //Gherkin-I should see "Field" default value as "blank"
        this.When(/^.*\"(.*)\".* value as blank|empty|None.*$/, function (selector) {

            return verifyPageObj.verifyElementWithValueNull(selector, this);

        });


        //Get URL and verify partial
        //Gherkin-Then I should see the URL directed to "ExpectedURL"
        this.Then(/^.*see the URL.*\"(.*)\".*$/, function (arg1, expectedValue) {

            return verifyPageObj.verifyPageURL(expectedValue, this);

        });


        //Get text from element
        //Gherkin-Then I should see the text of "Link" as "Get Link value"
        this.Then(/^.*see .*\"(.*)\".*is visible in.*\"(.*)\".*$/, function (expectedValue, selector) {

            return verifyPageObj.verifyElementText(selector, expectedValue, this, this);

        });

        ///Placeholders
        //Gherkin-And I should see placeholder of "Expected Value"
        this.When(/^.*see placeholder.*\"(.*)\".* as .*\"(.*)\".*$/, function (selector, expectedValue) {

            return verifyPageObj.verifyElementPlaceholder(selector, expectedValue, this);

        });


        this.Then(/^I should expect the following elements to be visible in list$/, function (table) {

            return verifyPageObj.verifyElementListVisible(table, this);

        });

        //verify default text on list and text box
        //Gherkin-Then I should see default "value" selected on "WebElement"
        this.Then(/^.*see default.*\"(.*)\".* selected on .*\"(.*)\".*$/, function (expectedValue, selector) {

            return verifyPageObj.verifyElementDefaultSelection(expectedValue, selector, this);

        });

        //verify first value selected as part of dropdown
        this.Then(/^.*see first value.*\"(.*)\".* from the .*\"(.*)\".*$/, function (expectedValue, selector) {

            return verifyPageObj.verifyElementFirstValue(expectedValue, selector, this);

        });


        // test the options in a select list
        //data to be passed in form of data table
        this.Given(/^.*see below values from the .*\"(.*)\".* list.*$/, function (selector, data) {

            return verifyPageObj.verifyDropDownValues(selector, data, this);

        });

        //verify if element present
        this.When(/^.*should see.*"([^"]*)".*being displayed.*$/, function (selector) {
            return verifyPageObj.verifyElementExist(selector, this, this);

        });

        //not sure
        this.Then(/^I (?:can|should) expect "(.*)" text to( not)? "(.*)" "(.*)"$/, function (selector, not, matchers, text) {

            return verifyPageObj.verifyElementMayExpect(selector, not, matchers, text, this);

        });

        //verify list of all countries
        this.Then(/^I should see the list of all countries from \"(.*)\"$/, function (selector) {

            return verifyPageObj.verifyCountryList(selector, this);

        });

        //verify the value of text attribute
        this.Given(/^.*value of .*"([^"]*)".* textbox as .*"([^"]*)".*$/, function (selector, readValue) {

            return verifyPageObj.verifyTextBoxValue(selector, readValue, this);

        });


        //validate that the value of an element should not be null
        this.Given(/^.*value existing in .*"([^"]*)".*$/, function (selector) {

            return verifyPageObj.verifyElementValueNotNull(selector, this);

        });


        //Validate if a link is pointing to a particular URL or not
        this.Then(/^.*"([^"]*)" link having URL "([^"]*)"$/, function (selector, testData) {

            return verifyPageObj.verifyElementLinkURL(selector, testData, this, this);

        });

    };


    module.exports = verifyStepsAgain;
}

catch (err) {

    console.log('Error in verify.js File');
    console.log(err);
}
