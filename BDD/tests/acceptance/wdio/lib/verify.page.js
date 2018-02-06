try {

    var formPageObj = new require('../lib/form.page');
    var actionPages = new require('../lib/actionPage');
    var navigationPage = new require('../lib/navigationPage');

    module.exports = {
      
        verifySelectorContent: function (selector, expectedValue, state, that) {
            selector = that.getSelector(selector);
            expectedValue = that.getData(expectedValue);

          if(!!state.client)
            state = that.client;
          
            return state
                .getText(selector)
                .then(function (readValue) {
                    that.expect(readValue.trim()).to.be.equal(expectedValue.trim());
                }.bind(that));
        },

      //below function verifies the text present in the "value" attribute of the locator
        verifySelectorText: function (selector, expectedValue, state, that) {
            expectedValue = that.getData(expectedValue);
            selector = that.getSelector(selector);

            if(!!state.client)
                state = that.client;

            return state
                .getAttribute(selector, 'value')
                .then(function (readValue) {
                    that.expect(readValue.trim()).to.be.equal(expectedValue.trim());
                }.bind(that));
        },


        verifyMouseOverContent: function (a, b, c, state, that) {

                selector = that.getSelector(a);
                tooltip = that.getSelector(c);
                console.log('fetched data: ' + that.getData(b));
            if(!!state.client)
                state = that.client;
              return state
                    .waitForVisible(selector, that.TIMEOUT_CONST)
                    .moveToObject(selector)
                    .pause(4000)
                    .waitForVisible(tooltip, that.TIMEOUT_CONST)
                    .getText(tooltip)
                    .then(function (actualTxt) { console.log('Actual Text: '); console.dir(actualTxt.trim());
                        that.expect(actualTxt.trim()).to.be.equal(that.getData(b).trim());
                    }.bind(that));
        },

        // verifyMouseOverContent: function (fields, that) {
        //     var fieldsTemp = fields.hashes();
        //     var currentChain;
        //     var count = 0;
        //     for(var i=0; i<fieldsTemp.length; i++){
        //
        //         console.log('count attempt: ' + count);
        //         selector = that.getSelector(fieldsTemp[i].helptext_link);
        //         tooltip = that.getSelector(fieldsTemp[i].tooltip_link);
        //
        //       currentChain =  that.client
        //             .moveToObject(selector, 0, 0)
        //             .pause(2000)
        //             .getText(tooltip)
        //             .then(function (actualTxt) {
        //                 that.expect(actualTxt.trim()).to.be.equal(that.getData(fieldsTemp[i].expected_helptext_data).trim());
        //             }.bind(that));
        //         count++;
        //         console.log('expected data is: ' + that.getData(fieldsTemp[i].expected_helptext_data));
        //     }
        //
        //     console.log('count is: ' + count);
        //     // return currentChain;
        //     // return navigationPage.waitInMilliSec(1, currentChain, this);
        // },

        verifyElementChecked: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .isSelected(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(true);
                }.bind(that));
        },

        verifyElementUnChecked: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .isSelected(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(false);
                }.bind(that));
        },

      verifyElementListSize: function (selector, expectedValue, that) {
        selector = that.getSelector(selector);
        return that.client
          .getElementSize(selector, 'placeholder').then(function (readValue) {
            console.log('*************'+readValue);
            console.log('************* length'+readValue.length);
            console.log('*************'+expectedValue);
            that.expect(parseInt(expectedValue)).to.equal(readValue.length);
          }.bind(that));
      },

        verifyElementNotSelected: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .isExisting(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(false);
                }.bind(that));
        },

        verifyElementSelected: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .isExisting(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(true);
                }.bind(that));
        },

        verifyElementIsEnabled: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .isEnabled(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(true);
                }.bind(that));
        },

        verifyElementIsDisabled: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .isEnabled(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(false);
                }.bind(that));
        },

        verifyElementExist: function (selector, state, that) {
            selector = that.getSelector(selector);

            if(!!state.client)
                state = that.client;

            return state
                // .waitForElemReady(selector, that.TIMEOUT_CONST)
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .isVisible(selector)
                .then(function (isExisting) {
                    if (isExisting) {
                        return that.assert(true === true, 'Expected element exists');
                    }
                    else {
                        return that.assert(true === false, 'Expected element should not exist')
                    }
                }.bind(that));
        },

        verifyElementExistReturnBoolean: function (selector, state, that) {
            selector = that.getSelector(selector);

            if(!!state.client)
                state = that.client;

            return state
                // .waitForElemReady(selector, that.TIMEOUT_CONST)
                .pause(1000)
                .isVisible(selector)
                .then(function (isExisting) {
                    return isExisting;
                }.bind(that));
        },

        verifyElementNotExist: function (selector, that) {
            selector = that.getSelector(selector);
            that.client
                .waitForExist(selector, that.TIMEOUT_CONST)
                .isVisible(selector)
                .then(function (isExisting) {
                    if (!isExisting) {
                        return that.assert(true === true, 'Expected element doesnt exist as expected');
                    }
                    else {
                        return that.assert(true === false, 'Expected element should not exist but its existing')
                    }
                }.bind(that));
        },

        verifyElementNotDisplayed: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .isVisible(selector)
                .then(function (isVisible) {
                    if (!isVisible) {
                        return that.assert(true === true, 'Expected element doesnt exist as expected');
                    }
                    else {
                        return that.assert(true === false, 'Expected element should not exist but its existing')
                    }
                }.bind(that));
        },

        verifyElementWithValueNull: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .getValue(selector)
                .then(function (readValue) {
                    that.should.equal(readValue, null);
                }.bind(that));
        },

        verifyPageURL: function (expectedValue, that) {
            return that.client
                .getUrl()
                .then(function (readValue) {
                    that.expect(readValue).to.contains(expectedValue);
                }.bind(that));
        },

        verifyElementText: function (selector, expectedValue, state, that) {
            selector = that.getSelector(selector);
            if(!!state.client)
                state = that.client;

            return state
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .getText(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.contains(expectedValue);
                }.bind(that));
        },

        verifyElementPlaceholder: function (selector, expectedValue, that) {
            selector = that.getSelector(selector);
            return that.client
                .getAttribute(selector, 'placeholder').then(function (readValue) {
                    that.expect(readValue).to.equal(expectedValue);
                }.bind(that));
        },

        verifyElementListVisible: function (table, that) {
            var rows = table.hashes();
            var index = 0;
            var self = that;

            function visible(row) {
                var field = self.getSelector(row['element']);

                console.log("Selector =" + row['element']);
                console.log("Finding field=" + field);

                return self.client.isVisible(field)
                    .then(function (isVisible) {
                        self.expect(isVisible).to.equal(true);
                        console.log("Success");
                        index++;
                        if (index === rows.length) {
                        } else {
                            return visible(rows[index]);
                        }
                    })
            }

            return visible(rows[index]);
        },

        verifyElementDefaultSelection: function (expectedValue, selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .getValue(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(expectedValue);
                }.bind(that));
        },

        verifyElementFirstValue: function (expectedValue, selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .getValue(selector)
                .then(function (readValue) {
                    that.expect(readValue).to.equal(expectedValue);
                }.bind(that));
        },

        // verifyDropDownValues: function (selector, data, that) {
        //     var rows = data.hashes();
        //     for (var i = 0; i < rows.length; i++) {
        //         return that.client
        //             .selectByIndex(selector, i)
        //             .getValue(selector)
        //             .then(function (value) {
        //                 console.log('inside the then');
        //                 console.log(value);
        //                 // returns "someValue4"
        //             }.bind(that));
        //     }
        // },

        verifyDropDownValue: function(selector, expectedValue, state, that){
        selector = that.getSelector(selector);
        selector = selector + "/option[text()='" + expectedValue + "']";

        if(!!state.client)
            state = that.client;

            return state
                .isExisting(selector)
                .then(function (isExisting) {
                    if (isExisting) {
                        return that.assert(true === true, 'Expected element exists in DropDown');
                    }
                    else {
                        return that.assert(true === false, 'Expected element: ' + expectedValue + ' doesnt exist in DropDown');
                    }
                }.bind(that));
        },

        verifyElementExpectation: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .elements(selector)
                .then(function (readValue) {
                    that.expect(readValue["value"].length > 1).to.equal(true);
                }.bind(that));
        },

        verifyElementMayExpect: function (selector, not, matchers, text, that) {
            selector = that.getSelector(selector);
            if (text.match(/{{.*}}/)) {
                text = eval(text);
            }
            matchers = matchers.split(',');
            var operator = matchers[0];
            var modifier = matchers[1] || '';
            return that.client
                .waitForExist(selector, that.TIMEOUT_CONST)
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .getText(selector).then(function (elementText) {
                    if (operator === 'match') {
                        text = new RegExp(text, modifier);
                    }
                    var expect = that.expect(elementText).to;
                    if (not) {
                        expect = expect.not;
                    }
                    return expect[operator](text);
                }.bind(that));
        },

        verifyCountryList: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .elements(selector)
                .then(function (readValue) {
                    that.expect(readValue["value"].length > 10).to.equal(true);
                }.bind(that));
        },

        verifyTextBoxValue: function (selector, readValue, that) {
            selector = that.getSelector(selector);
            return that.client
                .getValue(selector).then(function (expectedValue) {
                    that.expect(readValue).to.equal(expectedValue);
                    console.log(expectedValue);
                }.bind(that));
        },

        verifyElementValueNotNull: function (selector, that) {
            selector = that.getSelector(selector);
            return that.client
                .getValue(selector).then(function (readValue) {
                    (readValue).should.not.be.empty();
                    console.log(readValue);
                }.bind(that));
        },

        verifyElementLinkURL: function (selector, testData, state, that) {
            selector = that.getSelector(selector);
            testData = that.getData(testData);

          if(!!state.client)
            state = that.client;

            return state
                .waitForVisible(selector, that.TIMEOUT_CONST)
                .getAttribute(selector, 'href').then(function (actualData) {
                    that.expect(testData).to.equal(actualData);
                    console.log(actualData);
                }.bind(that));
        },

        verifyElementLinkURLUsingJS: function (selector, testData, state, that) {
          selector = that.getSelector(selector);
          testData = that.getData(testData);
          console.log('TEST_DATA: ', testData);
          if(!!state.client)
            state = that.client;

          return state
            .waitForVisible(selector, that.TIMEOUT_CONST)
            .execute(function(testData){
              return document.querySelector('[href="'+ testData +'"]').getAttribute('href');
            }, testData)
            .then(function (actualData) {
              console.dir(actualData);
              that.expect(testData).to.equal(actualData.value);
            }.bind(that));
        },

      verifyImageSourceUsingJS: function (selector, testData, state, that) {
        selector = that.getSelector(selector);
        testData = that.getData(testData);
        console.log('TEST_DATA: ', testData);
        if(!!state.client)
          state = that.client;

        return state
          .waitForVisible(selector, that.TIMEOUT_CONST)
          .execute(function(testData){
            return document.querySelector('[src="'+ testData +'"]').getAttribute('src');
          }, testData)
          .then(function (actualData) {
            console.dir(actualData);
            that.expect(testData).to.equal(actualData.value);
          }.bind(that));
      }
    };

}
catch(err){
    console.log('Error in verify.page.js File');
    console.log(err);
}
