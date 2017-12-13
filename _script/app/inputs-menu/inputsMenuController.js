define(['jquery', 'mustache', 'app/ros/ros', 'app/parsers/validInputsParser'], function ($, Mustache, Ros, Parser) {

    // VAR **************************************************************************

    const BUTTON_CLASS = ".input-toggle-background";
    const BUTTON_ON_CLASS = "on";
    const BUTTON_OFF_CLASS = "off";
    const URL = "/_view/menus/inputsMenu.mustache";

    const setInput = Ros.setInputsSrv();
    var showing = false;    // True if page is showing
    var cachedHTML = null;
    var validInputs = null; // ROS topic


    // MODULE ***********************************************************************

    return {
        load: function () {
            if (cachedHTML !== null) {
                $('#menu-injection').html(cachedHTML);
                enableMouse();
            } else {
                requestData();
            }

            // Setup listening for background changes to valid inputs
            if (validInputs === null) {
                subscribe();
            }
        },

        setShowing: function (val) {
            showing = val;
        }
    };

    // FUNC *************************************************************************

    // Request data for page over ROS
    function requestData() {
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

            $.get(URL, function(template) {
                cachedHTML = Mustache.render(template, mustacheData);

                if (showing) {
                    $('#menu-injection').html(cachedHTML);
                    enableMouse();
                }
            });
        });
    }


    // Listen over ROS for changes ot valid inputs
    function subscribe() {
        validInputs = Ros.validInputs();
        validInputs.subscribe(function (message) {
            console.log("valid inputs: ");
            console.log(message);
            var mustacheData = Parser.parse(message);

            $.get(URL, function(template) {
                cachedHTML = Mustache.render(template, mustacheData);
                if (showing) {
                    $('#menu-injection').html(cachedHTML);
                    enableMouse();
                }
            });
        });
    }


    function enableMouse() {
        $(BUTTON_CLASS).click(function () {

            var selectedButton = $(this);

            // Init service and request
            var request = new ROSLIB.ServiceRequest({
                "input_source": selectedButton.prev().attr("id"),
                "status": selectedButton.children(":first").hasClass(BUTTON_ON_CLASS)
            });

            // Call service to pass on button status
            setInput.callService(request, function(result) {
                console.log("Set input service result:");
                console.log(result);
                if (result.result === true) {
                    selectedButton.children(":first").toggleClass(BUTTON_ON_CLASS);
                    selectedButton.children(":first").toggleClass(BUTTON_OFF_CLASS);
                }
            });
        });
    }
});