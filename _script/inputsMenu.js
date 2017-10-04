function showInputsMenu() {
    var menuMaskData = { "inputsMenuToggled": true };
    var menuButtonTitles = [
        {"menuButtonTitle": "MOUSE"},
        {"menuButtonTitle": "GAZE"},
        {"menuButtonTitle": "ALEXA"},
    ];
    var menuData = {
        "menuItem": menuButtonTitles,
        "numMenuItems": menuButtonTitles.length
    };

    showMenu(menuMaskData, menuData, null);
}


$(document).ready(function() {
    $("#inputs-menu-page").click(showInputsMenu);
});
