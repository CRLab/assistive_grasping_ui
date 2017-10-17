var ConfigParser = function () {

    // Singleton *********************************************************

    var instance;
    var data;

    return {
        getData: function () {
            if (!instance) {
                instance = new ConfigParser();
            }
            return data;
        }
    };

    // *******************************************************************

    function ConfigParser() {
        data = sampleConfig;
        parseMenu();
    }


    function parseMenu() {
        // Write menu lengths
        for (var key in data) {
            data[key].numMenuItems = data[key].menuItems.length;
            data[key].menuMaskData = {};
        }

        // write menu mask data
        data.actionsMenu.menuMaskData.actionsMenuToggled = true;
        data.inputsMenu.menuMaskData.inputsMenuToggled = true;
        data.environmentMenu.menuMaskData.environmentMenuToggled = true;
    }
}();



var sampleConfig = {

    // Actions menu
    "actionsMenu": {
        "menuItems": [
            {"menuButtonTitle": "action 1"},
            {"menuButtonTitle": "action 2"}
        ],

        // Only add this if you want a submenu
        "submenuItems": [
            {"menuButtonTitle": "sub action 1"},
            {"menuButtonTitle": "sub action 2"}
        ]
    },

    // Environments menu
    "environmentMenu": {
        "menuItems": [
            {"menuButtonTitle": "env 1"},
            {"menuButtonTitle": "env 2"},
            {"menuButtonTitle": "env 3"}
        ],
        "submenuItems": [
            {"menuButtonTitle": "sub env 1"},
            {"menuButtonTitle": "sub env 2"}
        ]
    },

    // Environments menu
    "inputsMenu": {
        "menuItems": [
            {"menuButtonTitle": "mouse"},
            {"menuButtonTitle": "semg"}
        ],
    },
};
