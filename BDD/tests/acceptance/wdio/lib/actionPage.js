module.exports = {

    acceptAlert: function (selector, that) {
        selector = that.getSelector(selector);
        return that.client
            .alertAccept(selector)
            .then(function (readValue) {
                that.assert(true, 'Alert ' + dataSelector + ' Accepted');
            }.bind(that));
    },

    dismissAlert: function (selector, that) {
        selector = that.getSelector(selector);
        return that.client
            .alertDismiss(selector)
            .then(function (readValue) {
                that.assert(true, 'Alert ' + dataSelector + ' Dismissed');
            }.bind(that));
    },

    click: function (selector, that) {
        selector = that.getSelector(selector);
        return that.client
            .waitForVisible(selector, that.TIMEOUT_CONST)
            //.scroll(selector)
            .click(selector);
    },

    selectCheckBox: function (selector, that) {
        selector = that.getSelector(selector);
        return that.client
            .click(selector);
    },

    closeOpenDialogBox: function (that) {
        return that.client.alertText(function (err, res) {
            if (res != null) {
                return that.client.alertDismiss();
            }
        }.bind(that));
    },

    confirmationDialogExist: function (that) {
        return that.client.alertText(function (err, res) {

            that.expect(res !== undefined).to.equal(true);
        }.bind(that));
    },

    warningDialogExist: function (that) {
        return that.client.alertText(function (err, res) {

            that.expect(res !== undefined).to.equal(true);
        }.bind(that));
    },

    dismissDialog: function (that) {
        return that.client.alertText(function (err, res) {

            that.expect(res !== undefined).to.equal(true);

            if (res != null) {
                that.client.alertDismiss();
            }
        }.bind(that));
    },

    acceptDialogByReloding: function (that) {
        return that.client.alertText(function (err, res) {

            that.expect(res !== undefined).to.equal(true);

            if (res != null) {
                that.client.alertAccept();
            }
        }.bind(that));
    },

    pauseInMillisec: function (ms, state, that) {

        if (!!state.client)
            state = that.client;
        return state
            .pause(ms);
    },

    concatenatedKeyActions: function (keysequence, that) {
        return that.client
            .keys(keysequence);
    },

    //performs mouse's left click using Action class
    clickWithAction: function (selector, that) {
        selector = that.getSelector(selector);
        return that.client
            .waitForVisible(selector, that.TIMEOUT_CONST)
            .leftClick(selector, 0, 0);
    },


    randomStringCreator: function (randomString, selector, that) {
        randomString = 'Auto' + that.createRandomString() + randomString + that.createRandomString();
        console.log(randomString);
        selector = that.getSelector(selector);


        return that.client
            .waitForVisible(selector, that.TIMEOUT_CONST)
            .setValue(selector, randomString.trim());
    },

    scroll: function (selector, that) {
        selector = that.getSelector(selector);
        return that.client
        //.waitForExist(selector, 1000)
            .waitForVisible(selector, that.TIMEOUT_CONST)
            .then(function (result) {
                that.client.scroll(selector);
            }.bind(that));
    },

    openLinkInNewTab: function (selector, that) {
        selector = that.getSelector(selector);
        var testAttribute = '_blank';

        return that.client
            .getAttribute(selector, 'target').then(function (actualData) {

                that.expect(testAttribute).to.equal(actualData);

            }.bind(that));
    },

    dragAndDrop: function (sDraggable, sDroppable, state, that) {
        var sObjectDrag = that.getSelector(sDraggable);
        var sObjectDrop = that.getSelector(sDroppable);

        if (!!state.client)
            state = that.client;

        return state
            .waitForVisible(sObjectDrag, that.TIMEOUT_CONST)
            .waitForVisible(sObjectDrop, that.TIMEOUT_CONST)
            .dragAndDrop(sObjectDrag, sObjectDrop)
            .pause(500)
            .then(function () {
                return true;
            });
    },

    stepIntoFrame: function (selector, that) {
        selector = that.getSelector(selector);
        var my_frame = $(selector).value;
        return that.client
            .frame(JSON.stringify($(selector)));
    },

    stepIntoFrameUsingId: function (id, that) {
        return that.client
            .frame(id);
    },

    stepOutOfFrame: function (that) {

        return that.client
            .frameParent();
    },

    clickWithSmartWait: function (selector, state, that) {
        selector = that.getSelector(selector);

        if (!!state.client)
            state = that.client;

        return state
        //.waitForElemReady(selector,that.TIMEOUT_CONST)
            .waitForExist(selector, that.TIMEOUT_CONST)
            .waitForVisible(selector, that.TIMEOUT_CONST)
            // .waitForEnabled(selector,that.TIMEOUT_CONST)
            .click(selector).pause(3000);

    },

    clickByOffset: function (selector, x, y, state, that) {
        selector = that.getSelector(selector);

        if (!!state.client)
            state = that.client;

        return state
            .waitForElemReady(selector, that.TIMEOUT_CONST)
            // .moveToObject(selector, x, y)
            .leftClick(selector, x, y)
        // .waitForExist(selector,that.TIMEOUT_CONST)
        // .waitForEnabled(selector,that.TIMEOUT_CONST)
        // .click(selector);

    },


    AEMLogin: function (userRole, state, that) {

        login_userName = that.getSelector("HomeScreen UserName");
        login_pwd = that.getSelector("HomeScreen Password");
        btn_signIn = that.getSelector("HomeScreen Submit Button");

        if (!!state.client)
            state = that.client;
        return state
            .waitForVisible(login_userName, that.TIMEOUT_CONST)
            .click(login_userName)
            .setValue(login_userName, that.config.loginCredentials[userRole].userName)
            .click(login_pwd)
            .setValue(login_pwd, that.config.loginCredentials[userRole].password)
            .click(btn_signIn);
    },


    CRXLogin: function (userRole, that) {

        loginButton = that.getSelector("CRX Home Login Button");
        login_userName = that.getSelector("CRX Login UserName");
        login_pwd = that.getSelector("CRX Login Password");
        btn_signIn = that.getSelector("CRX Login Button");
        return that.client
            .waitForVisible(loginButton, that.TIMEOUT_CONST)
            .click(loginButton)
            .waitForEnabled(btn_signIn, that.TIMEOUT_CONST)
            .click(login_userName)
            .setValue(login_userName, that.config.loginCredentials[userRole].userName)
            .click(login_pwd)
            .setValue(login_pwd, that.config.loginCredentials[userRole].password)
            .click(btn_signIn);
    },

    doubleClick: function (selector, that) {

        selector = that.getSelector(selector);
        return that.client
            .waitForExist(selector, that.TIMEOUT_CONST)
            .waitForEnabled(selector, that.TIMEOUT_CONST)
            .doubleClick(selector);
    },

    // custom functions @Amit



    enterValueInRichTextFieldUsingJS: function (value, selector, state, that) {
        selector = that.getSelector(selector);
        if (!!state.client)
            state = that.client;

        return state
            .waitForVisible(selector, that.TIMEOUT_CONST)
            .execute(function (selector, value) {
                return document.querySelector(selector).insertAdjacentHTML('beforeend', '<p>' + value + '</p>');
            });
    }
};
