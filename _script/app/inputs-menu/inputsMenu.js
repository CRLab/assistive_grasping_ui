define(['jquery', 'mustache', 'app/ros/ros', 'app/parsers/validInputsParser'], function ($, Mustache, Ros, Parser) {

    // VAR **************************************************************************

    const BUTTON_CLASS = ".input-toggle-background";
    const BUTTON_ON_CLASS = "on";
    const BUTTON_OFF_CLASS = "off";

    var showing = false;    // True if page is showing
    var cachedHTML = null;


    // MODULE ***********************************************************************

    return {
        load: function () {
            if (cachedHTML !== null) {
                $('#menu-injection').html(cachedHTML);
            } else {
                initialLoad();
            }
        },

        setShowing: function (val) {
            showing = val;
        }
    };

    // FUNC *************************************************************************

    // Called first time page is loaded
    function initialLoad() {
        if (!showing) { return; }

        $('#menu-injection').html("");  // Clear current html

        // Init service and request
        var validInputsService = Ros.validInputsSrv();
        var request = new ROSLIB.ServiceRequest({
            request : ""
        });

        // Call service to initially load page
        validInputsService.callService(request, function(result) {
            console.log("valid inputs service result:");
            console.log(result);
            var mustacheData = Parser.parse(result);

            var url = "/_view/menus/inputsMenu.mustache";
            $.get(url, function(template) {
                cachedHTML = Mustache.render(template, mustacheData);
                $('#menu-injection').html(cachedHTML);
                enableMouse();
            });
        });

        // listen for background changes
        var validInputs = Ros.validInputs();
        validInputs.subscribe(function (message) {
            console.log("valid inputs: ");
            console.log(message);
            var mustacheData = Parser.parse(message);

            var url = "/_view/menus/inputsMenu.mustache";
            $.get(url, function(template) {
                cachedHTML = Mustache.render(template, mustacheData);
                if (showing) {
                    $('#menu-injection').html(cachedHTML);
                }
            });
        });
    }
    function enableMouse() {
        $(BUTTON_CLASS).click(function () {
            $(this).children(":first").toggleClass(BUTTON_ON_CLASS);
            $(this).children(":first").toggleClass(BUTTON_OFF_CLASS);
        });
    }
});