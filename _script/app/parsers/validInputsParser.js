define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid inputs into mustache formatted data
        parse: function (data) {
            var parsed = {"buttons": []};

            for (var i in data.inputs) {
                parsed.buttons.push( {"title": data.inputs[i], "status": data.statuses[i] } );
            }
            return parsed;
        }
    };
});