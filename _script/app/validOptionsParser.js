define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid options into mustache formatted data
        parse: function (validOptions) {
            var menuData = {"buttons": []};
            for (var i in validOptions) {
                menuData.buttons.push({"buttonTitle": validOptions[i]});
            }
            menuData.numButtons = validOptions.length;
            return menuData;
        }
    };
});