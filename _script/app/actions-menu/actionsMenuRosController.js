define(['jquery', 'app/ros/ros', 'app/actions-menu/actionsMenu', 'app/parsers/validActionsParser', 'app/actions-menu/actionsSubmenu'],
        function ($, Ros, ActionsMenu, ValidActionsParser, ActionsSubmenu) {

    // VAR **************************************************************************

    var validActionsData = null;
    var prevParent = null;

    // FUNC **************************************************************************

    // Subscribe to necessary ROS topics
    function subscribe() {
        var selectedAction = Ros.selectedAction();
        var validActions = Ros.validActions();
        var validActionsService = Ros.validActionsSrv();

        selectedAction.subscribe(function (message) {
            console.log("selected action: " + message["data"]);
            select(message["data"]);
        });

        validActions.subscribe(function (message) {
            console.log("valid actions: ");
            console.log(message);
            validActionsData = message;
            load();
        });


        // TODO: UP TO HERE. not getting a result from the service//////////////////////////////
        // Init service and request
        var request = new ROSLIB.ServiceRequest({
            req : ""
        });

        // Service response
        validActionsService.callService(request, function(result) {
            console.log("service result: ");
            console.log(result);
        });
        ////////////////////////////////////////////////////////////////////////////////


    }


    // Load the actions menu when valid actions have been recieved
    function load() {
        if (validActionsData === null) { return; }

        var menuData = ValidActionsParser.parse(validActionsData.commands);
        var executedID = validActionsData.parent;

        // menu
        if (validActionsData.menutype === "menu") {
            ActionsMenu.load(menuData);
            prevParent = validActionsData.parent;
            validActionsData = null;

        // submenu
        } else if (validActionsData.menutype === "submenu") {
            ActionsMenu.animateDisappear(executedID, function () {
                ActionsSubmenu.load(executedID, menuData);
                prevParent = validActionsData.parent;
                validActionsData = null;
            });
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
