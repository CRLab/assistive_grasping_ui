# Assistive Grasping UI
The Assistive Grasping UI that is needed for running the medical campus Mico experiments.

# Install
1) Install node and npm, then run `npm install`
2) Install bower with `npm install -g bower`, then run `bower install`
2) Install ROS (http://wiki.ros.org/ROS/Installation)
3) Install Rosbridge (http://wiki.ros.org/rosbridge_suite/Tutorials/RunningRosbridge)

# Run
1) Start ROS by opening a terminal window and running `roscore`
2) Start Rosbridge by opening another terminal window and running `roslaunch rosbridge_server rosbridge_websocket.launch`
3) In yet another terminal window, navigate to the project root and run `node scripts/assistiveGraspingUI.js`


# Docs

The entire UI can be populated and controlled over ROS, as described below:

### Populating Commands Menu, Environments Menu, and Inputs Menu

To initially load the data for these menus, ensure the following services are running:

```
/current_commands
/current_environments
/current_inputs
```

After the menus are initially loaded, you can broadcast any changes to the menus respectively by
sending messages over the following topics:

```
/valid_commands
/valid_environments
/valid_inputs
```

### Toggling Inputs and Environments

When a user changes the status of an input or environment by clicking a toggle or radio button, a message will
be sent to the respective services:

```
/set_environment_service
/set_input_service
```

If the service responds with `result=true`, the input or environment will change to the desired status, but if false,
the status will not change.

### Controlling Commands Menu

To simulate clicking a command in the Commands Menu, send a message over the topic
`/valid_commands` and set the `parent` variable in the message to the ID of the command to be clicked.

To simulate highlighting a command, send a message over the topic
`/currently_selected_command` and set the string in the message to the ID of the command to be highlighted.

### UI State

If at any time you would like to trigger a loading icon and disable user interaction, publish to the
topic `/crui_bot_status` a string that is either `loading` to trigger the loading state or `ready`
to end it.
