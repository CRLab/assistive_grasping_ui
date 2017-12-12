// TODO: Need to conform class to fit with other controllers

define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR *************************************************************************

    var button_classes = [".action-button", ".submenu-button"];

    var validMenuActions = ["menu1", "menu2", "menu3"];
    var validSubmenuActions = [
        ["submenu1", "submenu2", "back"],
        ["submenu3", "submenu4", "back"],
        ["submenu5", "submenu6", "back"]
    ];

    var validActionsData = {
        commands: validMenuActions,
        parent: "",
        menutype: "menu"
    };

    // ROS topics
    const executeAction = Ros.executeAction();
    const validActions = Ros.validActions();
    const selectedAction = Ros.selectedAction();

    // FUNC *************************************************************************

    // Return true if valid actions needs to be published over ROS, else false
    function updateValidActionsData(executedID) {
        var publish = false;
        validActionsData.parent = executedID;

        // Means we are clicking into the submenu
        if (validActionsData.menutype === "menu") {
            var submenuIndex = validMenuActions.indexOf(executedID);
            validActionsData.commands = validSubmenuActions[submenuIndex];
            validActionsData.menutype = "submenu";
            publish = true;

        // In submenu and clicking back button
        } else if (executedID === "back") {
            validActionsData.commands = validMenuActions;
            validActionsData.menutype = "menu";
            publish = true;
        }

        return publish;
    }


    function main() {

        // Set mouse click and hover callbacks
        $(document).ready(function () {
            for (var i in button_classes) {

                // click (attaching the event to #menu-injection will ensure it remains when menu page has changed)
                $("#menu-injection").on("click", button_classes[i], function () {
                    for (var j in validActionsData.commands) {
                        if (validActionsData.commands[j] === $(this).attr("id")) {
                            // publish execute
                            executeAction.publish(new ROSLIB.Message({data: $(this).attr("id")}));
                            console.log("Execute: " + $(this).attr("id"));

                            // publish valid actions if necessary
                            if (updateValidActionsData($(this).attr("id"))) {
                                var msg = new ROSLIB.Message(validActionsData);
                                validActions.publish(msg);
                            }
                        }
                    }

                // Hover in
                }).on("mouseenter", button_classes[i], function () {
                    selectedAction.publish(new ROSLIB.Message({data: $(this).attr("id")}));

                // Hover out
                }).on("mouseleave", button_classes[i], function () {
                    selectedAction.publish(new ROSLIB.Message({data: ""}));
                });
            }
        })
    }

    // MAIN *************************************************************************

    main();

});
