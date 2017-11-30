define(function () {

    // VAR **************************************************************************

    var ros = null;

    var topics = {
        EXECUTE_ACTION:         "/executeAction",
        VALID_ACTIONS:          "/validActions",
        SELECTED_ACTION:        "/selectedAction",
        VALID_INPUTS:           "/validInputs",
        VALID_ENVIRONMENTS:     "/validEnvironments",
        TOGGLED_INPUT:          "/toggledInput",
        TOGGLED_ENVIRONMENT:    "/toggledEnvironment"
    };

    // MODULE ************************************************************************

    return {
        init: function () { return init() },

        // Topics and services to connect to
        validActions: function () {         return topic(topics.VALID_ACTIONS); },
        executeAction: function () {        return topic(topics.EXECUTE_ACTION); },
        selectedAction: function () {       return topic(topics.SELECTED_ACTION); },
        validInputs: function () {          return service(topics.VALID_INPUTS); },
        validEnvironments: function () {    return service(topics.VALID_ENVIRONMENTS); },
        toggledInput: function () {         return topic(topics.TOGGLED_INPUT) },
        toggledEnvironment: function () {   return topic(topics.TOGGLED_ENVIRONMENT)  }

    };

    // FUNC **************************************************************************

    function init() {
        if (ros !== null) { return ros }

        ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' });
        ros.on('connection', function () {  console.log('Connected to websocket server.'); });
        ros.on('error', function (error) {  console.log('Error connecting to websocket server: ', error); });
        ros.on('close', function () {       console.log('Connection to websocket server closed.'); });
        return ros;
    }

    function topic(topic) {
        init();
        return new ROSLIB.Topic({
            ros: ros,
            name: topic,
            messageType: 'std_msgs/String'
        });
    }

    function service(topic) {
        init();
        return new ROSLIB.Service({
            ros : ros,
            name : topic,
            serviceType : topic
        });
    }
});
