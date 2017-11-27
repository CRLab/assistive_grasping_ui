define(['jquery', 'mustache'], function ($, Mustache) {

    // VAR **************************************************************************

    var HOVER_CLASS = "hover";
    var cachedHTML = null;
    var showing = false;    // true menu is in view, false if submenu is in view

    // MODULE **************************************************************************

    return {
        load: function (menuData) {
            var url = "/_view/menus/actionsMenu.mustache";
            $.get(url, function (template) {
                cachedHTML = Mustache.render(template, menuData);
                $('#menu-injection').html(cachedHTML);
                showing = true;
            });
        },

        loadCached: function () {
            $('#menu-injection').html(cachedHTML);
            showing = true;
        },

        animateDisappear: function(selectedButtonID, callback) {
            animateDisappear(selectedButtonID, callback);
        },

        showing: function () {
            return showing;
        }
    };

    // FUNC **************************************************************************

    function animateDisappear(selectedButtonID, callback) {
        cachedHTML = null;
        showing = false;

        // Permanently add hover css features to button
        var selectedButton = $("#" + selectedButtonID);
        selectedButton.off(HOVER_CLASS);

        // Calculate height to animate up selected button
        var circleHeight = 100;
        var selectedParent = selectedButton.parent();
        var animHeight = selectedParent.prevAll().length*selectedParent.height() +
            0.5 * selectedParent.height() -
            0.5 * circleHeight -
            25;

        // Animate up selected button
        selectedParent.animate({
            top: -animHeight + "px"
        }, {
            duration: 500,
            complete: callback
        });

        // Animate left non-selected buttons
        selectedParent.siblings().animate({
            marginLeft: '-300px'
        }, {
            duration: 200
        });
    }
});
