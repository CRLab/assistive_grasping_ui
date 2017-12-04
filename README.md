# Assistive Grasping UI
The Assistive Grasping UI that is needed for running the medical campus Mico experiments.

# Install
1) Install node and npm, then run `npm install`
2) Install ROS (http://wiki.ros.org/ROS/Installation)
3) Install Rosbridge (http://wiki.ros.org/rosbridge_suite/Tutorials/RunningRosbridge)

# Run
1) Start ROS by opening a terminal window and running `roscore`
2) Start Rosbridge by opening another terminal window and running `roslaunch rosbridge_server rosbridge_websocket.launch`
3) In yet another terminal window, navigate to the project root and run `node index.js`


# Docs

The entire UI can be populated and controlled over ROS, as described below:

### Environments and Inputs Menu

To initially load the data for these menus, ensure the following services are running:

```
\valid_environments_service
\valid_inputs_service
```

After the menus are inititally loaded, you can broadcast any changes to the menus respectively by 
sending messages over the following topics:

```
\valid_environments
\valid_inputs
```
