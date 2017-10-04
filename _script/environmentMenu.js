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
    var submenuData = {submenuItem: [0, 1, 2]};

    showMenu(menuMaskData, menuData, submenuData);
}


$(document).ready(function() {
    $("#environment-menu-page").click(showEnvironmentMenu);
});
