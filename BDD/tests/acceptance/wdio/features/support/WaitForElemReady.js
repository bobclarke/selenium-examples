module.exports = function(){
return function(selector, timeout) {
    return this.waitUntil(function () {
        var result = false;
        try {
            result =
                this.isVisible(selector).then(function (isVisible) {
                    return isVisible;
                });
            //this.scroll(selector);
        }
        catch (e) {
            return false;
        }
        return result;
    }, timeout)
        .then(function () {
            var ElemEventsBindingTimeout = 200;
            return this
                .pause(ElemEventsBindingTimeout)
                .then(function () {
                    return this;
                });
    })
}};



//module.exports = function(){
//     return function (selector, timeout) {
//        return this.waitUntil(function () {
//                var result = false;
//                try {
//                    result =
//                        //this.isExisting(selector).then(function (isExisting) {
//                        //    return isExisting;
//                        //}) &&
//                        this.isVisible(selector).then(function (isVisible) {
//                            return isVisible;
//                        }) &&
//                        this.isEnabled(selector).then(function (isEnabled) {
//                            return isEnabled;
//                        });
//                    //this.scroll(selector);
//                }
//                catch (e) {
//                    return false;
//                }
//                return result;
//            }, 15000).then(function(){
//            var ElemEventsBindingTimeout = 1000;
//            return this
//            .pause(ElemEventsBindingTimeout)
//            .then(function(){
//                return this;
//            });
//
//        });
//    }
//
//
//
//};