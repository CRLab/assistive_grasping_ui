define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR **************************************************************************

    const elementID = "#menu-loading-overlay";
    var status = Ros.cruiBotStatus();

    // MAIN **************************************************************************

    status.subscribe(function (message) {
        var data = message.data;
        console.log("Crui bot status: " + data);

        // Show/hide loading icon
        if (data === "loading") {
            $(elementID).css('opacity', '0');
            $(elementID).show();
            $(elementID).animate({
                opacity: 0.8
            }, 200);

        } else if (data === "ready") {
            $(elementID).animate({
                opacity: 0.0
            }, 200, function () {
                $(elementID).hide();
            });
        }
    });
});




