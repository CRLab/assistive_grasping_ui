define(['jquery', 'app/ros/ros', 'app/actions-menu/actionsMenu', 'app/parsers/validActionsParser', 'app/actions-menu/actionsSubmenu', 'mustache'],
        function ($, Ros, ActionsMenu, ValidActionsParser, ActionsSubmenu, Mustache) {

    // VAR **************************************************************************

    const SUBMENU_URL = "/_view/menus/actionsSubmenu.mustache";
    const MENU_URL = "/_view/menus/actionsMenu.mustache";
    const MENU_TYPES = {
        MENU: "menu",
        SUBMENU: "submenu"
    };

    var showing = false;    // True if page is showing
    var menuType = null;    // whether menu or submenu is showing
    var cachedHTML = null;
    var subscribed = false;  // True if listening for changes over ROS

    // MODULE ***********************************************************************

    return {
        load: function () {
            requestData();

            if (!subscribed) {
                subscribe();
            }
        },

        setShowing: function (val) {
            showing = val;
        }
    };

    // FUNC **************************************************************************

    // Request data to initially populate the page
    function requestData() {
        var validActionsService = Ros.validActionsSrv();
        console.log(validActionsService);

        // service request
        var request = new ROSLIB.ServiceRequest({
            request : "null"
        });

        // Service response
        validActionsService.callService(request, function(result) {
            console.log("service result: ");
            console.log(result);
            loadSpecificMenu(result);
        });
    }


    // Listen for execute commands over ROS
    function subscribe() {
        var selectedAction = Ros.selectedAction();
        var validActions = Ros.validActions();

        selectedAction.subscribe(function (message) {
            console.log("selected action: " + message["data"]);
            if (showing) {
                select(message.data);
            }
        });

        validActions.subscribe(function (message) {
            console.log("valid actions: ");
            console.log(message);
            loadSpecificMenu(message);
        });
        subscribed = true;
    }


    // Parse data and load either the menu or the submenu
    function loadSpecificMenu(data) {
        if (!showing) { return; }
        var menuData = ValidActionsParser.parse(data);

        // menu
        if (data.menutype === MENU_TYPES.MENU) {
            render(MENU_URL, menuData, null);

        // submenu
        } else if (data.menutype === MENU_TYPES.SUBMENU) {

            // full animation from menu to submenu
            if (menuType === MENU_TYPES.MENU) {
                ActionsMenu.animateDisappear(data.parent, function () {
                    render(SUBMENU_URL, menuData, function () {
                        ActionsSubmenu.animateIn();
                    });
                })

            // Skip animation
            } else if (menuType === MENU_TYPES.SUBMENU) {
                render(SUBMENU_URL, menuData, null);
            }
        }
        menuType = data.menutype;
    }


    // Render a specific view url, call callback when finished
    function render(url, data, callback) {
        $.get(url, function (template) {
            cachedHTML = Mustache.render(template, data);
            $('#menu-injection').html(cachedHTML);
            if (callback) { callback(); }
        });
    }


    // Select a menu option by adding hover class to it. CSS will take care of the rest
    function select(id) {
        $(".hover").removeClass("hover");
        if (id !== "") {
            $("#" + id).toggleClass("hover");
        }
    }
});
