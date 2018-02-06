var Screenshot = function () {

  this.After(function (scenario, callback) {
    if (scenario.isFailed()) {
      return this.client.saveScreenshot().then(function (stream) {

        var decodedImage = new Buffer(stream, 'base64').toString('binary');
        scenario.attach(decodedImage, 'image/png', callback);

      }, function(err) {
        callback(err);
      });
    }
    else {
      callback();
    }
  });

};
