define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid inputs into mustache formatted data
        parse: function (data) {
            var parsed = {"buttons": []};

            for (var i in data.environments) {
                var status = (data.current_environment === data.environments[i]) ? "on" : "off";
                parsed.buttons.push( {"title": data.environments[i], "status": status} );
            }
            return parsed;
        }
    };
});