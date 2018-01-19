define(['jquery', 'mustache', 'app/ros/ros', 'app/parsers/validEnvironmentsParser'], function ($, Mustache, Ros, Parser) {

    // VAR **************************************************************************

    const BUTTON_CLASS = ".environment-button-wrapper";
    const BUTTON_ON_CLASS = "on";
    const BUTTON_OFF_CLASS = "off";
    const URL = "/_view/menus/environmentMenu.mustache";

    const setEnv = Ros.setEnvironmentSrv();
    var showing = false;    // True if page is showing
    var cachedHTML = null;
    var validEnvironments = null;   // ROS topic

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
            if (validEnvironments === null) {
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
        var validEnvironmentsService = Ros.validEnvironmentsSrv();
        var request = new ROSLIB.ServiceRequest();

        // Call service to initially load page
        validEnvironmentsService.callService(request, function(result) {
            console.log("valid environments service result:");
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
        validEnvironments = Ros.validEnvironments();
        validEnvironments.subscribe(function (message) {
            console.log("valid environments: ");
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
                "environment": selectedButton.children().eq(1).attr("id"),
                "status": true
            });

            // Call service to pass on button status
            setEnv.callService(request, function(result) {
                console.log("Set input service result:");
                console.log(result);

                if (result.result === true) {
                    // Reset on/off tags
                    $(BUTTON_CLASS).find('*').each(function() {
                        $(this).addClass(BUTTON_OFF_CLASS);
                        $(this).removeClass(BUTTON_ON_CLASS);
                    });

                    // Turn on clicked radio button
                    selectedButton.find('*').each(function() {
                        $(this).addClass(BUTTON_ON_CLASS);
                        $(this).removeClass(BUTTON_OFF_CLASS);
                    });
                }
            });
        });
    }
});