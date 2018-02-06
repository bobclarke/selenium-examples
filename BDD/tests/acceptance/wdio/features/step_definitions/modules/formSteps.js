try {

    var world = new require('../../support/world.js');
    var formPageObj = new require('../../../lib/form.page');

    var formSteps = function () {

        //Set Data in a TextBox
        this.Given(/^.*enter .*\"(.*)\".* in .*\"(.*)\".*$/, function (setValue, selector) {

            return formPageObj.enterDataToElement(setValue, selector, this, this);

        });

        //Read data from a textbox
        //Gherkin-And I should see value of "Expected Value"
        this.Then(/^(.*)I should see (.*\"(.*)\".*) as value (.*\"(.*)\".*)$/, function
            (businessSummaryStart, arg2, expectedValue, arg4, selector) {

            return formPageObj.varifyDataInElement(expectedValue, selector, this);

        });

        //Select a Radio button/Checkbox
        //Gherkin-When I select the "checkbox/Radio"
        this.When(/^.*select.*\"(.*)\".*checkbox|RadioButton.*$/, function (selector) {

            return formPageObj.selectButton(selector, this);
        });

        //Select an element from the list Check if an text of the selected element exists in the destination element
        //Gherkin-When I select the "checkbox/Radio"
        this.When(/^.*choose the \"(.*)\" for \"(.*)\" from the .*$/, function (sourceselector, destinationselector, arg1) {

            return formPageObj.selectElementFromList(sourceselector, destinationselector, this);

        });

        //UnSelect a CheckBox
        //Gherkin-When I unselect the "checkbox/Radio"
        this.When(/^I unselect the (.*\"(.*)\".*)$/, function (arg1, selector) {

            return formPageObj.unSelectElementFromList(selector, this);

        });
        //Select a value from List by Index
        //Gherkin-And I select item with Index 10 from "elementDropdown"
        this.When(/^.*select.*with Index (.*) from .*\"(.*)\".*$/, function (index, arg2, selector) {

            return formPageObj.selectElementFromListByIndex(index, selector, this);

        });


        this.Given(/^.*select.*from dropdown with value .*"([^"]*)".* from .*"([^"]*)".*$/, function (value, selector) {

            return formPageObj.dropDownSelectByValue(value, selector, this);

        });


        //Select a value from List by Value
        //Gherkin-I select item with value "Value" from "elementDropdown"
        this.When(/^.*select.*with value .*\"(.*)\".* from .*\"(.*)\".*$/, function (value, selector) {

            return formPageObj.selectItemByValue(value, selector, this);

        });


        //Select a value from List by Value
        //Gherkin-I select item with value "Value" from "elementDropdown"
        this.When(/^.*select.*with text \"(.*)\" from .*\"(.*)\".*$/, function (value, selector) {

            return formPageObj.selectItemByText(value, selector, this);

        });

    };

    module.exports = formSteps;

}
catch (err) {
    console.log('Error in form.js File');
    console.log(err);

}
