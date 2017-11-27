define(['jquery', 'app/ros', 'app/actionsMenu', 'app/parsers/validActionsParser', 'app/actionsSubmenu'],
        function ($, Ros, ActionsMenu, ValidActionsParser, ActionsSubmenu) {

    // VAR **************************************************************************

    var validActionsData = null;
    var executeID = null;
    var initialLoad = true;   // First time the page is loaded flag

    // FUNC **************************************************************************

    // Subscribe to necessary ROS topics
    function subscribe() {
        var selectedAction = Ros.selectedAction();
        var executeAction = Ros.executeAction();
        var validActions = Ros.validActions();

        selectedAction.subscribe(function (message) {
            console.log("selected action: " + message["data"]);
            select(message["data"]);
        });

        executeAction.subscribe(function (message) {
            console.log("execute action: " + message["data"]);
            executeID = message["data"];
            execute();
        });

        validActions.subscribe(function (message) {
            console.log("valid actions: " + message);
            validActionsData = JSON.parse(message["data"]);
            execute();
        });
    }

    function execute() {
        var menuData = validActionsData !== null ? ValidActionsParser.parse(validActionsData["validActions"]) : null;

        // On page load, show actions menu
        if (initialLoad && validActionsData !== null && validActionsData.menuType === "menu") {
            ActionsMenu.load(menuData);
            initialLoad = false;
            validActionsData = null;

        // Wait for both variables
        } else if (executeID !== null && validActionsData !== null) {
            // Show actions submenu
            if (validActionsData.menuType === "submenu") {
                ActionsMenu.animateDisappear(executeID, function () {
                    ActionsSubmenu.load(executeID, menuData);
                    executeID = null;
                    validActionsData = null;
                });

            // Check for back press to return to menu
            } else if (executeID === "back" && validActionsData.menuType === "menu") {
                ActionsMenu.load(menuData);
                executeID = null;
                validActionsData = null;
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
