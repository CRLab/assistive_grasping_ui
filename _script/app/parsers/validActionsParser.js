define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid options into mustache formatted data
        parse: function (data) {
            var menuData = {"buttons": []};
            for (var i in data.commands) {
                menuData.buttons.push({"buttonTitle": data.commands[i]});
            }
            menuData.numButtons = data.commands.length;
            menuData.selectedButtonTitle = data.parent;
            return menuData;
        }
    };
});