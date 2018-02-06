const Keyboard = require('../keyboard');
const iOSHelper = require('./ios.helper');

class MemorableInformationKeyboard extends Keyboard {
    constructor() {
        super(iOSHelper.keyboardLocator(),
            [['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm']]);
    }
}

module.exports = MemorableInformationKeyboard;
