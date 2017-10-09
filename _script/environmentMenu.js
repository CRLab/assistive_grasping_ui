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
    
    showMenu(menuMaskData, menuData, submenuData, function(id) {
        console.log(id);
    });}



$(document).ready(function() {
    $("#environment-menu-page").click(showEnvironmentMenu);
});
