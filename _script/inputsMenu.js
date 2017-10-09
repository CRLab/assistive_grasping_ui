function showInputsMenu() {
    var menuMaskData = { "inputsMenuToggled": true };
    var menuButtonTitles = [
        {"menuButtonTitle": "MOUSE"},
        {"menuButtonTitle": "SMG"}
    ];
    var menuData = {
        "menuItem": menuButtonTitles,
        "numMenuItems": menuButtonTitles.length
    };

    showMenu(menuMaskData, menuData, undefined, inputsMenuOptionSelected);
}


function inputsMenuOptionSelected(id) {
    if (id === "SMG") {
        setupInputType(INPUTS.BINARY);
    } else if (id == "MOUSE") {
        setupInputType(INPUTS.CLICK);
    }
}


$(document).ready(function() {
    $("#inputs-menu-page").click(showInputsMenu);
});
