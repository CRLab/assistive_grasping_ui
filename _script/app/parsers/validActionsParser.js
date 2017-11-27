define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid options into mustache formatted data
        parse: function (validActions) {
            var menuData = {"buttons": []};
            for (var i in validActions) {
                menuData.buttons.push({"buttonTitle": validActions[i]});
            }
            menuData.numButtons = validActions.length;
            return menuData;
        }
    };
});