module.exports = {

    verifyExist : function(selector, that){

        var selector = that.getSelector(selector);
        return that.client
            .waitForExist(selector,that.TIMEOUT_CONST)
            .waitForEnabled(selector,that.TIMEOUT_CONST)
            .click(selector);
    }
};