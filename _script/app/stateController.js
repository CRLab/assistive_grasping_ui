define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR **************************************************************************

    const NOTIFICATION_IN = "0.5s ease-in 0s 1 normal forwards running notification-slide-in";
    const NOTIFICATION_OUT = "0.5s ease-in 0s 1 normal forwards running notification-slide-out";
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

    Ros.logMessage().subscribe(function (message) {
        var data = message.data;
        console.log("New message: " + data);
        $("#notification-text").html(data);
        $("#notification-container").css("animation", NOTIFICATION_IN);
    });


    $("#notification-container").ready(function() {
        $("#notification-close-button").click(function() {
            $("#notification-container").css("animation", NOTIFICATION_OUT);
        });
    });
});




