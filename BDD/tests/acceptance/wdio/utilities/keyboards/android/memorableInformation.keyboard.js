const Keyboard = require('../keyboard');
const AndroidHelper = require('./android.helper');

class MemorableInformationKeyboard extends Keyboard {
    constructor() {
        super(AndroidHelper.keyboardLocator(),
            [['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm']]);
    }
}

module.exports = MemorableInformationKeyboard;
