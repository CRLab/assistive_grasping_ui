define(['jquery', 'mustache'], function ($, Mustache) {

    // VAR **************************************************************************

    var cachedHTML = null;

    // MODULE ***********************************************************************

    return {
        load: function (selectedButtonID, menuData) {
            $.get("/_view/menus/actionsSubmenu.mustache", function(template) {

                // Append selected button title
                menuData['selectedButtonTitle'] = selectedButtonID;

                // Render submenu
                cachedHTML = Mustache.render(template, menuData);
                $('#menu-injection').html(cachedHTML);

                // animate submenu in
                $('.submenu-button, .spacer').css("left", "-150px");
                $('.spacer, .submenu-button').animate({
                    left: "0px"
                }, {
                    duration: 400
                });
            });
        },

        loadCached: function () {
            $('#menu-injection').html(cachedHTML);
        }

    };
});