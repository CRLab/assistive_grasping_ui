define(['jquery', 'mustache', 'app/ros', 'app/parsers/validInputsParser'], function ($, Mustache, Ros, Parser) {

    // VAR **************************************************************************

    var BUTTON_CLASS = ".environment-button-wrapper";
    var BUTTON_ON_CLASS = "on";
    var BUTTON_OFF_CLASS = "off";

    // MODULE ***********************************************************************

    return {
        load: function () {
            $('#menu-injection').html("");  // Clear current html

            // Init service and request
            var validEnvironmentsClient = Ros.validEnvironments();
            var request = new ROSLIB.ServiceRequest({
                req : ""
            });

            // Service response
            validEnvironmentsClient.callService(request, function(result) {
                var jsonRes = JSON.parse(result[Object.keys(result)[0]]);    // Grabs the data inside the first key
                var mustacheData = Parser.parse(jsonRes);

                var url = "/_view/menus/environmentMenu.mustache";
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

                // Reset on/off tags
                $(BUTTON_CLASS).find('*').each(function() {
                    $(this).addClass(BUTTON_OFF_CLASS);
                    $(this).removeClass(BUTTON_ON_CLASS);
                });

                // Turn on clicked radio button
                $(this).find('*').each(function() {
                    $(this).addClass(BUTTON_ON_CLASS);
                    $(this).removeClass(BUTTON_OFF_CLASS);
                });
            }
        });
    }
});