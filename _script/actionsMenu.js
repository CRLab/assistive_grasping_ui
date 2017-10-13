function showActionsMenu() {
    var menuMaskData = { "actionsMenuToggled": true };
    var menuButtonTitles = [
        {"menuButtonTitle": "GRASP1"},
        {"menuButtonTitle": "GRASP2"},
        {"menuButtonTitle": "GRASP3"},
        {"menuButtonTitle": "GRASP4"},
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

    showMenu(menuMaskData, menuData, submenuData, actionsMenuOptionSelected);
}


// Called on a menu button click
function actionsMenuOptionSelected(id) {
    if (id === "sEMG") {
        setupInputType(INPUTS.BINARY);
    } else if (id == "MOUSE") {
        setupInputType(INPUTS.CLICK);
    }
}


$(document).ready(function() {
    $("#actions-menu-page").click(showActionsMenu);
    showActionsMenu();
});
