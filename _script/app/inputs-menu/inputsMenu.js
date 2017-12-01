define(['jquery', 'mustache', 'app/ros/ros', 'app/parsers/validInputsParser'], function ($, Mustache, Ros, ValidInputsParser) {

    // VAR **************************************************************************

    var BUTTON_CLASS = ".input-toggle-background";
    var BUTTON_ON_CLASS = "on";
    var BUTTON_OFF_CLASS = "off";

    // MODULE ***********************************************************************

    return {
        load: function () {
            $('#menu-injection').html("");  // Clear current html

            // Init service and request
            var validInputsClient = Ros.validInputs();
            var request = new ROSLIB.ServiceRequest({
                req : ""
            });

            // Service response
            validInputsClient.callService(request, function(result) {
                var jsonRes = JSON.parse(result[Object.keys(result)[0]]);   // Grabs the data inside the first key
                var mustacheData = ValidInputsParser.parse(jsonRes);

                var url = "/_view/menus/inputsMenu.mustache";
                $.get(url, function(template) {
                    var rendered = Mustache.render(template, mustacheData);
                    $('#menu-injection').html(rendered);
                    enableMouse();
                });
            });
        }
    };

    // FUNC *************************************************************************

    function enableMouse() {
        $(BUTTON_CLASS).click(function () {
            if ($(this).attr("id") !== "mouse-toggle") {
                $(this).children(":first").toggleClass(BUTTON_ON_CLASS);
                $(this).children(":first").toggleClass(BUTTON_OFF_CLASS);
            }
        });
    }
});