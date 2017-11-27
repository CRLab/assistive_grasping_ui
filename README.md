# Assistive Grasping UI
The Assistive Grasping UI that is needed for running the medical campus Mico experiments.

# Install
1) Install node and npm, then run `npm install`
2) Install ROS (http://wiki.ros.org/ROS/Installation)
3) Install Rosbridge (http://wiki.ros.org/rosbridge_suite/Tutorials/RunningRosbridge)

# Run
1) Start up ROS by opening up terminal and running `roscore`
2) Start up Rosbridge by opening another terminal and running `roslaunch rosbridge_server rosbridge_websocket.launch`
3) In yet another terminal, navigate to the project and run `node index.js`


# Docs

The entire UI can be populated and controlled over ROS, as described below:

### Environment and Inputs Menus

The environments menu defines the valid environment. Only one environment may be toggled at a time. 
The inputs menu defines the valid inputs that may interact with the interface. Multiple inputs may be toggled at a time. 
To populate the menus, write a ROS service called
`/validInputs` or `/validEnvironments` respectively. The service should take in a string (unused at the moment, so you 
can ignore it) and return the valid inputs or environments in the JSON form: 

```javascript
    var data = {
        "<input-or-environment-title>": "<status>"     // title must be unique, status can be on/off                                  
    };
```

**Note:** Be sure to convert the JSON variable `data` to a string before sending over ROS. 


### Actions Menu
Displays action buttons and supports menu and submenu layers. The buttons for
each layer can be dynamically populated by sending a ROS message over the topic
`/validActions`. The message for the menu layer should be in the JSON form:

```javascript
  var data = {
        "validActions": ["<button-id>", "<button-id>", "<button-id>"],    // List of unique buttons
        "parent": "<parent-button-id>",      // The previous button id that was clicked
        "menuType": "menu"                                   
    };
```

The message for the submenu layer should be in the JSON form:

```javascript
  var data = {
        "validActions": ["<button-id>", "<button-id>", "back"],    // Make sure "back" is present to enable navigating back to menu layer
        "parent": "<parent-button-id>",                                        
        "menuType": "submenu"                                   
    };
```

**Notes:** Be sure to convert the JSON variable `data` to a string before sending over ROS. Also note that
the UI will only update when it receives this message. Therefore, whenever a button is clicked, be sure to send a new message
if you wish to display a new set of buttons. 


### Selected Action
The currently selected action button, AKA the button that is being hovered over in the actions menu. This can be controlled over ROS by
sending a message over the topic `/selectedAction` in the format:

```javascript
var data = "<button-id>";
```

**Note:** The button id here must match the button id sent in `/validActions`.


### Execute Action
The button that should be clicked in the actions menu. Clicking a button can be controlled over ROS by
sending a message over the topic `/executeAction` in the format:


```javascript
var data = "<button-id>";
```

**Note:** The button id here must match the button id sent in `/validActions`.
