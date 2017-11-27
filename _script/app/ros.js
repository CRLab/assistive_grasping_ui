define(function () {

    // VAR **************************************************************************

    var ros = null;
    var EXECUTE_OPTION = 0, VALID_OPTIONS = 1, CURRENTLY_SELECTED = 2, VALID_INPUTS = 3;
    var options = ["/executeOption", "/validOptions", "/currentlySelected", "/validInputs"];

    // MODULE ************************************************************************

    return {
        init: function () {
            if (ros !== null) {
                return ros
            }

            ros = new ROSLIB.Ros({
                url: 'ws://localhost:9090'
            });

            ros.on('connection', function () {
                console.log('Connected to websocket server.');
            });

            ros.on('error', function (error) {
                console.log('Error connecting to websocket server: ', error);
            });

            ros.on('close', function () {
                console.log('Connection to websocket server closed.');
            });

            return ros;
        },

        validOptions: function () {         return topic(VALID_OPTIONS); },
        executeOption: function () {        return topic(EXECUTE_OPTION); },
        currentlySelected: function () {    return topic(CURRENTLY_SELECTED); },
        validInputs: function () {          return service(VALID_INPUTS); }
    };

    // FUNC **************************************************************************

    function topic(type) {
        return new ROSLIB.Topic({
            ros: ros,
            name: options[type],
            messageType: 'std_msgs/String'
        });
    }

    function service(type) {
        return new ROSLIB.Service({
            ros : ros,
            name : options[type],
            serviceType : options[type]
        });
    }
});
