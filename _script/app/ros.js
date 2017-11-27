define(function () {

    // VAR **************************************************************************

    var ros = null;
    var EXECUTE_ACTION = 0, VALID_ACTIONS = 1, SELECTED_ACTION = 2, VALID_INPUTS = 3, VALID_ENVIRONMENTS = 4;
    var options = ["/executeAction", "/validActions", "/selectedAction", "/validInputs", "/validEnvironments"];

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

        validActions: function () {         return topic(VALID_ACTIONS); },
        executeAction: function () {        return topic(EXECUTE_ACTION); },
        selectedAction: function () {    return topic(SELECTED_ACTION); },
        validInputs: function () {          return service(VALID_INPUTS); },
        validEnvironments: function () {    return service(VALID_ENVIRONMENTS); }
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
