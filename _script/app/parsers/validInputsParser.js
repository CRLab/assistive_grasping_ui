define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid inputs into mustache formatted data
        parse: function (validInputs) {
            var data = {"buttons": []};
            Object.keys(validInputs).forEach(function(key) {
                data.buttons.push( {"title": key, "status": validInputs[key] } );
            });
            return data;
        }
    };
});