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

### Inputs Menu

The inputs menu defines the valid inputs that may interact with the interface. To populate, write a ROS service called
`/validInputs`. The service should take in a string (unused at the moment, so you can ignore it) and return the valid inputs 
in the JSON form: 

```javascript
    var validInputsData = {
        "<input-title>": "<status>"     // title must be unique, status can be on/off                                  
    };
```

**Note:** Be sure to convert the JSON variable `validInputsData` to a string before sending over ROS. 


### Actions Menu
Displays action buttons and supports menu and submenu layers. The buttons for
each layer can be dynamically populated by sending a ROS message over the topic
`/validOptions`. The message for the menu layer should be in the JSON form:

```javascript
  var validOptionsData = {
        "validOptions": ["<button-id>", "<button-id>", "<button-id>"],    // List of unique buttons
        "parent": "<parent-button-id>",      // The previous button id that was clicked
        "menuType": "menu"                                   
    };
```

The message for the submenu layer should be in the JSON form:

```javascript
  var validOptionsData = {
        "validOptions": ["<button-id>", "<button-id>", "back"],    // Make sure "back" is present to enable navigating back to menu layer
        "parent": "<parent-button-id>",                                        
        "menuType": "submenu"                                   
    };
```

**Notes:** Be sure to convert the JSON variable `validOptionsData` to a string before sending over ROS. Also note that
the UI will only update when it receives this message. Therefore, whenever a button is clicked, be sure to send a new message
if you wish to display a new set of buttons. 


### Currently Selected
The currently selected button, AKA the button that is being hovered over in the actions menu. This can be controlled over ROS by
sending a message over the topic `/currentlySelected` in the format:

```javascript
var data = "<button-id>";
```

**Note:** The button id here must match the button id sent in `/validOptions`.


### Execute Option
AKA the button that should be clicked in the actions menu. Clicking a button can be controlled over ROS by
sending a message over the topic `/executeOption` in the format:


```javascript
var data = "<button-id>";
```

**Note:** The button id here must match the button id sent in `/validOptions`.
