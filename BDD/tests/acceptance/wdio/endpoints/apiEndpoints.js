/**
 * Created by hbora on 6/16/17.
 */
var self = module.exports = {

  getEndpoint: function(job) {

    var endPoint = {};

    if (job === 'local') {

      endPoint['SSOAPI'] = 'http://stack1.com/foo?id=1235';
    }

    return endPoint;

  }


};
