define(function () {

    // VAR **************************************************************************

    var ros = null;

    // value = [topicName, messageType]
    var topics = {
        VALID_ACTIONS:          ["/valid_commands", "external_controller_msgs/ValidCommands"],
        VALID_ACTIONS_SRV:      ["/current_commands", "external_controller_msgs/CurrentCommands"],
        SELECTED_ACTION:        ["/currently_selected_command", "std_msgs/String"],
        EXECUTE_ACTION:         ["/execute_command", "std_msgs/String"],
        RAW_EXECUTE_ACTION:     ["/raw_execute_command", "external_controller_msgs/RawExecuteCommand"],
        RAW_SELECTED_ACTION:    ["/raw_currently_selected_command", "external_controller_msgs/RawCurrentlySelectedCommand"],

        VALID_ENVIRONMENTS:     ["/valid_environments", "external_controller_msgs/ValidEnvironments"],
        VALID_ENVIRONMENTS_SRV: ["/current_environments", "external_controller_msgs/CurrentEnvironments"],
        SET_ENVIRONMENT_SRV:    ["/set_environment_service", "external_controller_msg/SetEnvironment"],

        VALID_INPUTS:           ["/valid_inputs", "external_controller_msgs/ValidInputs"],
        VALID_INPUTS_SRV:       ["/currentInputs", "external_controller_msgs/CurrentInputs"],
        SET_INPUT_SRV:          ["/set_input_service", "external_controller_msgs/SetInput"],

        CRUI_BOT_STATUS:        ["/crui_bot_status", "std_msgs/String"]
    };


    // MODULE ************************************************************************

    return {
        init: function () { return init() },

        // Topics and services to connect to
        validActions: function () {             return topic(topics.VALID_ACTIONS); },
        validActionsSrv: function () {          return service(topics.VALID_ACTIONS_SRV); },
        selectedAction: function () {           return topic(topics.SELECTED_ACTION); },
        executeAction: function () {            return topic(topics.EXECUTE_ACTION); },
        rawSelectedAction: function () {        return topic(topics.RAW_SELECTED_ACTION); },
        rawExecuteAction: function () {         return topic(topics.RAW_EXECUTE_ACTION); },

        validEnvironments: function () {        return topic(topics.VALID_ENVIRONMENTS); },
        validEnvironmentsSrv: function () {     return service(topics.VALID_ENVIRONMENTS_SRV); },
        setEnvironmentSrv: function () {        return service(topics.SET_ENVIRONMENT_SRV); },

        validInputs: function () {              return topic(topics.VALID_INPUTS); },
        validInputsSrv: function () {           return service(topics.VALID_INPUTS_SRV); },
        setInputsSrv: function () {             return service(topics.SET_INPUT_SRV); },
        cruiBotStatus: function () {            return topic(topics.CRUI_BOT_STATUS); }
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

    function topic(param) {
        init();
        return new ROSLIB.Topic({
            ros: ros,
            name: param[0],
            messageType: param[1]
        });
    }

    function service(param) {
        init();
        return new ROSLIB.Service({
            ros : ros,
            name : param[0],
            serviceType : param[1]
        });
    }
});
