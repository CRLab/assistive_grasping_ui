function showActionsMenu() {
    var menuMaskData = { "actionsMenuToggled": true };
    var menuButtonTitles = [
        {"menuButtonTitle": "GRASP"},
        {"menuButtonTitle": "GRASP"},
        {"menuButtonTitle": "GRASP"},
        {"menuButtonTitle": "GRASP"},
    ];
    var menuData = {
        "menuItem": menuButtonTitles,
        "numMenuItems": menuButtonTitles.length
    };
    var submenuData = {submenuItem: [0, 1, 2]};

    showMenu(menuMaskData, menuData, submenuData);
}


$(document).ready(function() {
    $("#actions-menu-page").click(showActionsMenu);
    $("#page-title").click(showActionsMenu);
    showActionsMenu();
});
