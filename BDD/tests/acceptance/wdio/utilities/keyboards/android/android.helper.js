class AndroidHelper {
    static keyboardLocator() {
        return '//android.view.View[contains(@resource-id, "keyboard_android_l")]';
    }
}

module.exports = AndroidHelper;
