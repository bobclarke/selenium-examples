const Keyboard = require('../keyboard');
const iOSHelper = require('./ios.helper');

class LoginKeyboard extends Keyboard {
   constructor() {
        super(iOSHelper.keyboardLocator(), [['qwertyuiop', 'asdfghjkl', 'zxcvbnm', ' '],
            ['1234567890', '-/_+()£&@', '.,?!\'', ' ']]);
    }
}

module.exports = LoginKeyboard;
