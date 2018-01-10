define(['jquery', "app/cameraController"], function ($, Camera) {

    function enableSettingsButton() {
        $("#settings-button").click(function() {
            var settings = $("#settings-container");
            if (settings.is(':visible')) {
                settings.hide();
            } else {
                settings.show();
            }
        });
    }

    $("#settings-container").ready(function() {

        enableSettingsButton();

        $(".input-toggle-background").click(function () {

            var selectedButton = $(this);
            var id = selectedButton.attr("id");
            selectedButton.children(":first").toggleClass("on");
            selectedButton.children(":first").toggleClass("off");

            if (id == "background-toggle") {
                var color = selectedButton.children(":first").hasClass("on") ? "#000000" : "#ffffff";
                Camera.setBackgroundColor(color);
            } else if (id == "point-cloud-toggle") {
                Camera.togglePointCloud(selectedButton.children(":first").hasClass("on"));
            }
        });
    });
});