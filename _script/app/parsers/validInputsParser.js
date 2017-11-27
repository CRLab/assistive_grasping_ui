define(function () {

    // MODULE ***********************************************************************

    return {

        // Parse valid inputs into mustache formatted data
        parse: function (validInputs) {
            var data = {"inputButtons": []};
            Object.keys(validInputs).forEach(function(key) {
                data.inputButtons.push( {"inputButtonTitle": key, "status": validInputs[key] } );
            });
            return data;
        }
    };
});