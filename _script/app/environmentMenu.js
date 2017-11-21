define(['jquery', 'mustache'], function ($, Mustache) {

    // VAR **************************************************************************

    var BUTTON_CLASS = ".environment-button-wrapper";
    var BUTTON_ON_CLASS = "on";
    var BUTTON_OFF_CLASS = "off";

    var data = {
        "environmentButtons": [
            {
                "buttonTitle": "env1",
                "status": "on"
            }, {
                "buttonTitle": "env2",
                "status": "off"
            }, {
                "buttonTitle": "env3",
                "status": "off"
            }
        ]
    };

    // MODULE ***********************************************************************

    return {
        load: function () {
            var url = "/_view/menus/environmentMenu.mustache";
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