define(['jquery', 'app/ros'], function ($, Ros) {

    // VAR *************************************************************************

    var ros = Ros.init();

    var button_classes = [".action-button", ".submenu-button"];

    var validMenuOptions = ["menu1", "menu2", "menu3"];
    var validSubmenuOptions = [
        ["submenu1", "submenu2", "back"],
        ["submenu3", "submenu4", "back"],
        ["submenu5", "submenu6", "back"]
    ];

    var validOptionsData = {
        "validOptions": validMenuOptions,
        "parent": "",
        "menuType": "menu"
    };

    // ROS topics
    var executeOption = Ros.executeOption();
    var validOptions = Ros.validOptions();
    var currentlySelected = Ros.currentlySelected();

    // FUNC *************************************************************************

    // Sleep execution for given amount of time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Return true if valid options needs to be published over ROS, else false
    function updateValidOptionsData(executedID) {
        var publish = false;
        validOptionsData.parent = executedID;

        // Means we are clicking into the submenu
        if (validOptionsData.menuType === "menu") {
            var submenuIndex = validMenuOptions.indexOf(executedID);
            validOptionsData.validOptions = validSubmenuOptions[submenuIndex];
            validOptionsData.menuType = "submenu";
            publish = true;

        // In submenu and clicking back button
        } else if (executedID === "back") {
            validOptionsData.validOptions = validMenuOptions;
            validOptionsData.menuType = "menu";
            publish = true;
        }

        return publish;
    }


    async function main() {

        // Publish valid options to initially load page
        var msg = new ROSLIB.Message({data: JSON.stringify(validOptionsData)});
        await sleep(2000);
        validOptions.publish(msg);

        // Set mouse click and hover callbacks
        $(document).ready(function () {
            for (var i in button_classes) {
                // click (attaching the event to #menu-injection will ensure it remains when menu page has changed)
                $("#menu-injection").on("click", button_classes[i], function () {
                    for (var j in validOptionsData.validOptions) {
                        if (validOptionsData.validOptions[j] === $(this).attr("id")) {
                            // publish execute
                            executeOption.publish(new ROSLIB.Message({data: $(this).attr("id")}));

                            // publish valid options if necessary
                            if (updateValidOptionsData($(this).attr("id"))) {
                                var msg = new ROSLIB.Message({data: JSON.stringify(validOptionsData)});
                                validOptions.publish(msg);
                            }
                        }
                    }

                // Hover in
                }).on("mouseenter", button_classes[i], function () {
                    currentlySelected.publish(new ROSLIB.Message({data: $(this).attr("id")}));

                // Hover out
                }).on("mouseleave", button_classes[i], function () {
                    currentlySelected.publish(new ROSLIB.Message({data: ""}));
                });
            }
        })
    }

    // MAIN *************************************************************************

    main();

});
