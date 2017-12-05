define(['jquery'], function ($) {

    // MODULE ***********************************************************************

    return {

        // animate submenu in
        animateIn: function () {
            $('.submenu-button, .spacer').css("left", "-150px");
            $('.spacer, .submenu-button').animate({
                left: "0px"
            }, {
                duration: 400
            });
        },
    };
});