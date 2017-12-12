// TODO: Need to conform class to fit with other controllers

define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR *************************************************************************

    const button_classes = [".action-button", ".submenu-button"];

    // ROS topics
    const rawExecute = Ros.rawExecuteAction();
    const rawSelected = Ros.rawSelectedAction();

    // MAIN *************************************************************************

    // Set mouse click and hover callbacks
    $(document).ready(function () {
        for (var i in button_classes) {

            // click (attaching the event to #menu-injection will ensure it remains when menu page has changed)
            $("#menu-injection").on("click", button_classes[i], function () {
                rawExecute.publish(new ROSLIB.Message({
                    "command": $(this).attr("id"),
                    "input_source": "mouse"
                }));

                // Hover in
            }).on("mouseenter", button_classes[i], function () {
                rawSelected.publish(new ROSLIB.Message({
                    "command": $(this).attr("id"),
                    "input_source": "mouse"
                }));

                // Hover out
            }).on("mouseleave", button_classes[i], function () {
            });
        }
    });

});
