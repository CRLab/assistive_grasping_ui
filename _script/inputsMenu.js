function showInputsMenu() {
    menuData = ConfigParser.getData().inputsMenu;
    showMenu(menuData, inputsMenuOptionSelected);
}


// Called on a menu button click
function inputsMenuOptionSelected(id) {
    console.log(id);
    if (id === "semg") {
        setupInputType(INPUTS.BINARY);
    } else if (id == "mouse") {
        setupInputType(INPUTS.CLICK);
    }
}


$(document).ready(function() {
    $("#inputs-menu-page").click(showInputsMenu);
});
