define(['jquery', 'mustache'], function ($, Mustache) {

    // VAR **************************************************************************

    var BUTTON_CLASS = ".input-toggle-background";
    var BUTTON_ON_CLASS = "on";
    var BUTTON_OFF_CLASS = "off";

    var data = {
        "inputButtons": [
            {
                "inputButtonTitle": "mouse",
                "status": "on"
            }, {
                "inputButtonTitle": "semg",
                "status": "off"
            }, {
                "inputButtonTitle": "switch",
                "status": "off"
            }
        ]
    };

    // MODULE ***********************************************************************

    return {
        load: function () {
            var url = "/_view/menus/inputsMenu.mustache";
            $.get(url, function(template) {
                var rendered = Mustache.render(template, data);
                $('#menu-injection').html(rendered);
                enableMouse();
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