function showActionsMenu() {
    menuData = ConfigParser.getData().actionsMenu;
    showMenu(menuData, actionsMenuOptionSelected);
}


// Called on a menu button click
function actionsMenuOptionSelected(id) {
    console.log(id);
}


$(document).ready(function() {
    $("#actions-menu-page").click(showActionsMenu);
    showActionsMenu();
});
