define(['jquery'], function ($) {

    // VAR **************************************************************************

    const HOVER_CLASS = "hover";

    // MODULE **************************************************************************

    return {

        // Animate away the menu
        animateDisappear: function(selectedButtonID, callback) {

            // Permanently add hover css features to button
            var selectedButton = $("#" + selectedButtonID);

            // check button exists
            if (!selectedButton.length) {
                if (callback !== null) { callback(); }
                return;
            }

            selectedButton.on(HOVER_CLASS);

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

    };
});
