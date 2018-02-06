module.exports = {

    navigateWithoutMaximise: function (url, that) {

        console.log('Navigating to URL:' + url);

        return that.client
            .url(url);
    },

    pageRefresh: function (state, that) {

        if (!!state.client)
            state = that.client;

        return state
            .refresh();
    },

    pressBackButton: function (that) {
        return that.client
            .back();
    },

    pageClose: function (that) {

        return that.client;
    },

    waitInMilliSec: function (seconds, state, that) {
        if (!!state.client)
            state = that.client;
        return state
            .pause(seconds * 1000);
    },

    closeLastOpenedWindow: function (that) {

        return that.client
            .windowHandles()
            .then(function (windowHandles) {
                var lastWindowHandle = windowHandles.value.slice(-1);
                return that
                    .window(lastWindowHandle[0])
            }.bind(that));
    },

    openNewWindow: function (type, falseCase, that) {

        return that.client
            .windowHandles()
            .then(function (windowHandles) {
                windowHandles = windowHandles.value;
                if (falseCase) {
                    windowHandles.length.should.equal(1, "A new window should not have not been opened");
                } else {
                    windowHandles.length.should.not.equal(1, "A new window has been opened");
                }
                return that;
            });
    },

    verifyPageTitle: function (page, that) {

        expect(page).to.equal(that.client.getTitle);

    },
    brandwiseNavigation: function (page, brand, state, that) {

        console.log("brand = " + brand);
        console.log("invite = " + page);
        // navigateTo.call(brand, null, page, that);
        console.log("brand = " + brand + " page = " + page);

        if (!!state.client)
            state = that.client;

        var url;
        // If page contains undefined value the empty the variable
        if (page != "") {
            if (brand == "aemPublishedSite") {
                url = that.config.serverUrls[brand] + "/" + page + ".html?wcmmode=disabled";
            }
            else
                url = that.config.serverUrls[brand] + "/" + page + ".html";
        }
        else {
            url = that.config.serverUrls[brand];
        }
        console.log("Final Generated URL = " + url);
        return state
            .url(url)
            // .windowHandleMaximize()
            .pause(1000);
    },

    brandwiseNavigation1: function (component, brand, mode, state, that) {

        console.log("brand = " + brand);
        console.log("component = " + component);
        console.log("mode = " + mode);
        // navigateTo.call(brand, null, page, that);
        // console.log("brand = " + brand  + " page = " + page);
        var url;
        if (!!state.client)
            state = that.client;

        if (mode == 'author') {
            url = that.config.serverUrls["aemAuthorTestPage"] + '/' + brand + '/' + component + '.html';
        }
        else if (mode == 'publish') {
            url = that.config.serverUrls["aemPublishTestPage"] + '/' + brand + '/' + component + '.html?wcmmode=disabled';

        }
        console.log("Final Generated URL = " + url);
        return state
            .url(url)
            // .windowHandleMaximize()
            .pause(1000);
    },

    brandwiseNavigationAppendStr: function (appendStr, component, brand, mode, state, that) {

        console.log("brand = " + brand);
        console.log("component = " + component);
        console.log("mode = " + mode);
        // navigateTo.call(brand, null, page, that);
        // console.log("brand = " + brand  + " page = " + page);
        var url;
        if (!!state.client)
            state = that.client;

        if (mode == 'author') {
            url = that.config.serverUrls["aemAuthorTestPage"] + '/' + brand + '/' + component + '.html' + appendStr;
        }
        else if (mode == 'publish') {
            url = that.config.serverUrls["aemPublishTestPage"] + '/' + brand + '/' + component + '.html?wcmmode=disabled' + appendStr;

        }
        console.log("Final Generated URL = " + url);
        return state
            .url(url)
            // .windowHandleMaximize()
            .pause(1000);
    },

    navigateWithMaximiseWindow: function (url, state, that) {

        if (url && !url.startsWith('http')) {
            url = that.config.serverUrls[url];
        }

        if (true) {
            console.log('Navigating to URL:' + url);


            state = that.client;

            return state
                .url(url)
             //   .windowHandleMaximize();
                .pause(3000);
        } else {
            console.log("Invalid URL / URL definition not found in config");
            return false;
        }

    },

    publishedAnchoredNavigation: function (appendStr, page, brand, state, that) {

        console.log("brand = " + appendStr + " page = " + page);

        if (!!state.client)
            state = that.client;

        var url;
        // If page contains undefined value the empty the variable
        if (page != "") {
            url = that.config.serverUrls[brand] + "/" + page + ".html?wcmmode=disabled" + appendStr;
        }
        else {
            url = that.config.serverUrls[brand];
        }
        console.log("Final Generated URL = " + url);
        return state
            .url(url)
            // .windowHandleMaximize
            .pause(1000);
    },
    validateUrl: function (value) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i.test(value);
    }

};
