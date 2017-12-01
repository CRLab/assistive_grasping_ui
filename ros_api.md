# ROS topics and services guide

### topic: valid_commands
topic: `/valid_commands`

ValidCommands.msg format:

    string[] commands
    string parent #command last executed
    string menutype #can be "menu" or "submenu"

### service: valid_commands_service (for initialization)

server: `valid_commands_service`

ValidCommands.srv format:

    string request #empty string
    --- #stuff to return
    string[] commands
    string parent #command last executed
    string menutype #can be "menu" or "submenu"




### topic: currently_selected_command
topic: `/currently_selected_command`

type: `std_msgs/String`
    
### topic: raw_execute_command
topic: `/raw_execute_command`

ExecuteCommand.msg format:

    string input_source
    string command
    
### topic: execute_command (super final serious)
topic: `/execute_command`

type: `std_msgs/String`

### service: set_input_service
server: `set_input_service`

SetInput.srv:

    string input_source
    bool status
    ---
    bool result

### topic: valid_environments
topic: `/valid_environments`

ValidEnvironments.msg:
    
    string[] environments
    

### service: valid_environments_service
topic: `/valid_environments_service`

ValidEnvironments.srv:
    
    string request
    ---
    string[] environments
    


### service: set_environment_service
server: `set_environment_service`

SetEnvironment.srv:

    string environment
    bool status
    ---
    bool result
    
    
    
### topic: valid_inputs
topic: `valid_inputs`

ValidInputs.msg:
    
    string[] inputs
    
### service: valid_inputs_service
server: `valid_inputs_service`

ValidInputs.srv:
    
    string request
    ---
    string[] inputs
    
### topic: crui_bot
topic: `/crui_bot_status`

format: `std_msgs/String`
