function showEnvironmentMenu() {
    var menuMaskData = { "environmentMenuToggled": true };
    var menuButtonTitles = [
        {"menuButtonTitle": "GRASP"},
        {"menuButtonTitle": "GRASP"}
    ];
    var menuData = {
        "menuItem": menuButtonTitles,
        "numMenuItems": menuButtonTitles.length
    };
    var submenuData = {
        "submenuItem": [
            {"buttonTitle": "SUB1"},
            {"buttonTitle": "SUB2"}
        ]
    };

    showMenu(menuMaskData, menuData, submenuData, environmentMenuOptionSelected);
}


// Called on a menu button click
function environmentMenuOptionSelected(id) {
    if (id === "sEMG") {
        setupInputType(INPUTS.BINARY);
    } else if (id == "MOUSE") {
        setupInputType(INPUTS.CLICK);
    }
}


$(document).ready(function() {
    $("#environment-menu-page").click(showEnvironmentMenu);
});
