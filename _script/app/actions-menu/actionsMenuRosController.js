define(['jquery', 'app/ros', 'app/actions-menu/actionsMenu', 'app/parsers/validActionsParser', 'app/actions-menu/actionsSubmenu'],
        function ($, Ros, ActionsMenu, ValidActionsParser, ActionsSubmenu) {

    // VAR **************************************************************************

    var validActionsData = null;
    var initialLoad = true;   // First time the page is loaded fla
    var prevParent = null;

    // FUNC **************************************************************************

    // Subscribe to necessary ROS topics
    function subscribe() {
        var selectedAction = Ros.selectedAction();
        var validActions = Ros.validActions();

        selectedAction.subscribe(function (message) {
            console.log("selected action: " + message["data"]);
            select(message["data"]);
        });

        validActions.subscribe(function (message) {
            console.log("valid actions: " + message);
            validActionsData = JSON.parse(message["data"]);
            // execute();
            load();
        });
    }
    

    function load() {
        if (validActionsData === null) { return; }

        var menuData = ValidActionsParser.parse(validActionsData.validActions);
        var executedID = validActionsData.parent;

        if (validActionsData.menuType === "menu") {
            ActionsMenu.load(menuData);
        } else if (validActionsData.menuType === "submenu") {
            ActionsMenu.animateDisappear(executedID, function () {
                ActionsSubmenu.load(executedID, menuData);
            });
        }

        prevParent = validActionsData.parent;
        validActionsData = null;
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
