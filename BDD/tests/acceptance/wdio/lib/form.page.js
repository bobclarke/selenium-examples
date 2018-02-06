try {


    module.exports = {


        enterDataToElement: function (setValue, selector, state, that) {

            selector = that.getSelector(selector);

            console.log('Selector is : ' + selector);


            if (!!state.client)
                state = that.client;

            return state
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .click(selector)
                .setValue(selector, setValue.trim()).keys('Tab');

        },

        enterDataToElementAndWait: function (setValue, selector, state, that) {
            selector = that.getSelector(selector);

            if (!!state.client)
                state = that.client;

            return state
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .click(selector)
                .setValue(selector, setValue.trim())
                .pause(2000);
        },

        varifyDataInElement: function (setValue, selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .getValue(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(expectedValue);
                }.bind(that));
        },

        selectButton: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .click(selector)
                .then(function () {
                    that.assert(true, 'Radio Button Selected');
                }.bind(that));
        },

        selectElementFromList: function (sourceselector, destinationselector, that) {
            sourceselector = that.getSelector(sourceselector);
            destinationselector = that.getSelector(destinationselector);
            return that.client
                .waitForVisible(sourceselector, that.TIMEOUT_CONST)
                .getText(sourceselector).then(function (sourceSelectorText) {
                    console.log("source=" + sourceSelectorText);
                    return that.client.click(sourceselector)
                        .waitForVisible(destinationselector, that.TIMEOUT_CONST)
                        .getValue(destinationselector).then(function (destinationSelectorText) {
                            console.log("destination=" + destinationSelectorText);
                            return that.expect(destinationSelectorText).to.equal(sourceSelectorText);
                        }.bind(that))
                }.bind(that));
        },

        unSelectElementFromList: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .isSelected(selector)
                .then(function (state) {
                    console.log("State=: " + state);
                    if (state === false) {
                        that.assert(true, 'Radio Button unSelected');
                    }
                }.bind(that));
        },

        selectElementFromListByIndex: function (index, selector, that) {

            selector = that.getSelector(selector);
            return that.client
                .selectByIndex(selector, index)
                .then(function (readValue) {
                    that.assert(true, 'Item selected from list using Index');
                }.bind(that));
        },

        dropDownSelectByValue: function (value, selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .selectByValue(selector, value)
                .click(selector)
                .then(function (readValue) {
                    that.assert(true, 'Item selected from list using Value');
                }.bind(that));
        },

        selectItemByValue: function (value, selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .selectByValue(selector, value)
                .then(function (readValue) {
                    that.assert(true, 'Item selected from list using Value');
                }.bind(that));
        },

        selectItemByText: function (value, selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                //.click(selector)
                .selectByVisibleText(selector, value)
                .then(function (readValue) {
                    that.assert(true, 'Item selected from list using Text');
                }.bind(that));
        }

    };

}
catch (err) {
    console.log('Error in form.page.js File');
    console.log(err);
}

