const Keyboard = require('../keyboard');
const AndroidHelper = require('./android.helper');

class LoginKeyboard extends Keyboard {
    constructor() {
        super(AndroidHelper.keyboardLocator(), [['qwertyuiop', 'asdfghjkl', 'zxcvbnm', ' '],
            ['1234567890', '@#£%&-+()', '*"\':;!?', ',_ /.', ' ']]);
    }
}

module.exports = LoginKeyboard;
