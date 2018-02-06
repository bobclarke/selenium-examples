/* eslint import/no-dynamic-require: "off" */

class KeyboardFactory {
    static getKeyboard(name) {
        const platform = browser.desiredCapabilities.platformName.toLowerCase();
        //const Keyboard = require(`./ios/${name}`);
      const Keyboard = require('./ios/login.keyboard');
        return new Keyboard();
    }
}

module.exports = KeyboardFactory;
