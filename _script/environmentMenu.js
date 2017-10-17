function showEnvironmentMenu() {
    menuData = ConfigParser.getData().environmentMenu;
    showMenu(menuData, actionsMenuOptionSelected);
}


// Called on a menu button click
function environmentMenuOptionSelected(id) {
    console.log(id);
}


$(document).ready(function() {
    $("#environment-menu-page").click(showEnvironmentMenu);
});
