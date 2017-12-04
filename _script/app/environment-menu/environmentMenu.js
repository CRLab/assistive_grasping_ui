define(['jquery', 'mustache', 'app/ros/ros', 'app/parsers/validEnvironmentsParser'], function ($, Mustache, Ros, Parser) {

    // VAR **************************************************************************

    const BUTTON_CLASS = ".environment-button-wrapper";
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
        var validEnvironmentsService = Ros.validEnvironmentsSrv();
        var request = new ROSLIB.ServiceRequest({
            request : ""
        });

        // Call service to initially load page
        validEnvironmentsService.callService(request, function(result) {
            console.log("valid environments service result:");
            console.log(result);
            var mustacheData = Parser.parse(result);

            var url = "/_view/menus/environmentMenu.mustache";
            $.get(url, function(template) {
                cachedHTML = Mustache.render(template, mustacheData);
                $('#menu-injection').html(cachedHTML);
                enableMouse();
            });
        });

        // listen for background changes
        var validEnvironments = Ros.validEnvironments();
        validEnvironments.subscribe(function (message) {
            console.log("valid environments: ");
            console.log(message);
            var mustacheData = Parser.parse(message);

            var url = "/_view/menus/environmentMenu.mustache";
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

        });
    }
});