const DeviceHelper = require('../device.helper');

function Keyboard(locator, keys) {
  // constructor(locator, keys) {
  this.locator = locator;
  this.keys = keys;
  this.currentScreen = 0;

  this.offset = browser.getLocation(this.locator);
  this.dimension = browser.getElementSize(this.locator);

  // TODO remove hacky UIAutomation fix once Perfecto supports XCUITest
  if (!DeviceHelper.isAndroid()) {
    const firstKeyLocator = '//UIAElement[@label="q" or @label="1"]';
    if (browser.isVisible(firstKeyLocator)) {
      const firstKeyLocation = browser.getLocation(firstKeyLocator);
      this.offset.y += firstKeyLocation.y;
      this.dimension.height -= firstKeyLocation.y;
    }
  }

  this.keyWidth = this.dimension.width / this.keys[0][0].length;
  this.keyHeight = this.dimension.height / this.keys[0].length;
  // }
}

Keyboard.prototype.clickKey = function(c) {
    for (let screen = 0; screen < this.keys.length; screen++) {
        for (let row = 0; row < this.keys[screen].length; row++) {
            for (let key = 0; key < this.keys[screen][row].length; key++) {
                if (this.keys[screen][row][key] === c) {
                    while (this.currentScreen !== screen) {
                        this.switchKeyboard();
                    }
                    this.click(key * this.keyWidth
                        + (this.dimension.width
                        - this.keys[screen][row].length * this.keyWidth) / 2
                        + this.keyWidth / 2, row * this.keyHeight
                        + this.keyHeight / 2);
                }
            }
        }
    }
}

Keyboard.prototype.switchKeyboard = function() {
    this.click(this.keyWidth / 2, this.dimension.height - this.keyHeight / 2);
    this.currentScreen++;
    this.currentScreen %= this.keys.length;
}

Keyboard.prototype.resetKeyboard = function() {
    this.currentScreen = 0;
}

Keyboard.prototype.click = function(x, y) {
    browser.touchPerform([{
        action: 'tap',
        options: {
            x: x + this.offset.x,
            y: y + this.offset.y
        }
    }]);
}


module.exports = Keyboard;
