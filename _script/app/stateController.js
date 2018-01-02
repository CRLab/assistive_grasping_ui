define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR **************************************************************************

    const elementID = "#menu-loading-overlay";
    var status = Ros.cruiBotStatus();

    // FUNCTION **********************************************************************

    function showNotificationBar(message, duration, bgColor, txtColor, height) {

        /*set default values*/
        duration = typeof duration !== 'undefined' ? duration : 1500;
        bgColor = typeof bgColor !== 'undefined' ? bgColor : "#F4E0E1";
        txtColor = typeof txtColor !== 'undefined' ? txtColor : "#A42732";
        height = typeof height !== 'undefined' ? height : 40;
        /*create the notification bar div if it doesn't exist*/
        if ($('#notification-bar').size() == 0) {
            var HTMLmessage = "<div class='notification-message' style='text-align:center; line-height: " + height + "px;'> " + message + " </div>";
            $('body').prepend("<div id='notification-bar' style='display:none; width:100%; height:" + height + "px; background-color: " + bgColor + "; position: fixed; z-index: 100; color: " + txtColor + ";border-bottom: 1px solid " + txtColor + ";'>" + HTMLmessage + "</div>");
        }
        /*animate the bar*/
        $('#notification-bar').slideDown(function() {
            setTimeout(function() {
                $('#notification-bar').slideUp(function() {});
            }, duration);
        });
    }

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

        showNotificationBar(data);
    });
});




