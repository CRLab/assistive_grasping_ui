define(['jquery', 'app/ros', 'app/actionsMenu', 'app/parsers/validOptionsParser', 'app/actionsSubmenu'],
        function ($, Ros, ActionsMenu, ValidOptionsParser, ActionsSubmenu) {

    // VAR **************************************************************************

    var validOptionsData = null;
    var executeID = null;
    var initialLoad = true;   // First time the page is loaded flag

    // FUNC **************************************************************************

    // Subscribe to necessary ROS topics
    function subscribe() {
        var currentlySelected = Ros.currentlySelected();
        var executeOption = Ros.executeOption();
        var validOptions = Ros.validOptions();

        currentlySelected.subscribe(function (message) {
            console.log("selected: " + message["data"]);
            select(message["data"]);
        });

        executeOption.subscribe(function (message) {
            console.log("execute: " + message["data"]);
            executeID = message["data"];
            execute();
        });

        validOptions.subscribe(function (message) {
            console.log("valid options: " + message);
            validOptionsData = JSON.parse(message["data"]);
            execute();
        });
    }

    function execute() {
        var menuData = validOptionsData !== null ? ValidOptionsParser.parse(validOptionsData["validOptions"]) : null;

        // On page load, show actions menu
        if (initialLoad && validOptionsData !== null && validOptionsData.menuType === "menu") {
            ActionsMenu.load(menuData);
            initialLoad = false;
            validOptionsData = null;

        // Wait for both variables
        } else if (executeID !== null && validOptionsData !== null) {
            // Show actions submenu
            if (validOptionsData.menuType === "submenu") {
                ActionsMenu.animateDisappear(executeID, function () {
                    ActionsSubmenu.load(executeID, menuData);
                    executeID = null;
                    validOptionsData = null;
                });

            // Check for back press to return to menu
            } else if (executeID === "back" && validOptionsData.menuType === "menu") {
                ActionsMenu.load(menuData);
                executeID = null;
                validOptionsData = null;
            }
        }
    }

    // Select a menu option by adding hover class to it. CSS will take care of the rest
    function select(id) {
        $(".hover").removeClass("hover");
        if (id !== "") {
            $("#" + id).toggleClass("hover");
        }
    }

    // MAIN **************************************************************************

    subscribe();
});
