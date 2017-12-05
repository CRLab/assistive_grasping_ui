define(['jquery', 'mustache', 'app/actions-menu/actionsMenuController', 'app/inputs-menu/inputsMenuController', 'app/environment-menu/environmentMenuController'],
        function ($, Mustache, ActionsMenu, InputsMenu, EnvironmentMenu) {

    // VAR **************************************************************************

    const PAGE_CONTROL_IDS = {
        ACTIONS: "actionsMenu",
        ENVIRONMENTS: "environmentMenu",
        INPUTS: "inputsMenu"
    };

    const PAGE_CONTROL_DATA = {
        "pageControls": [
            {
                "pageControlID":PAGE_CONTROL_IDS.ACTIONS,
                "icon": "actions.png"
            }, {
                "pageControlID": PAGE_CONTROL_IDS.ENVIRONMENTS,
                "icon": "environment.png"
            }, {
                "pageControlID": PAGE_CONTROL_IDS.INPUTS,
                "icon": "inputs.png"
            }
        ]
    };

    // MAIN **************************************************************************

    $(document).ready(function() {
        loadPageControls();
        loadMask(PAGE_CONTROL_IDS.ACTIONS);
        loadMenu(PAGE_CONTROL_IDS.ACTIONS);
    });

    // FUNC **************************************************************************

    function loadPageControls() {
        var ids = [PAGE_CONTROL_IDS.ACTIONS, PAGE_CONTROL_IDS.ENVIRONMENTS, PAGE_CONTROL_IDS.INPUTS];
        $.get("/_view/pageControl.mustache", function(template) {
            var rendered = Mustache.render(template, PAGE_CONTROL_DATA);
            $('#page-control').html(rendered);

            // load menu type on page control click
            for (var i = 0; i < Object.keys(PAGE_CONTROL_IDS).length; i++) {
                (function(index) {  // Allows access to i (index) in click callback
                    $("#" + ids[index]).click(function() {
                        loadMask(ids[index]);
                        loadMenu(ids[index]);
                    });
                })(i);
            }
        });
    }

    // Load menu mask for a specific page
    function loadMask(menuType) {
        $.get("/_view/menuMask.mustache", function(template) {
            var key = menuType + "Toggled";
            var data = {};
            data[key] = true;
            var rendered = Mustache.render(template, data);
            $('#menu-mask-injection').html(rendered);
        });
    }

    // Load menu for a specific page
    function loadMenu(menuType) {
        EnvironmentMenu.setShowing(false);
        InputsMenu.setShowing(false);
        ActionsMenu.setShowing(false);

        switch (menuType) {
            case PAGE_CONTROL_IDS.ACTIONS:
                ActionsMenu.setShowing(true);
                ActionsMenu.load();
                break;

            case PAGE_CONTROL_IDS.ENVIRONMENTS:
                EnvironmentMenu.setShowing(true);
                EnvironmentMenu.load();
                break;

            case PAGE_CONTROL_IDS.INPUTS:
                InputsMenu.setShowing(true);
                InputsMenu.load();
                break;

            default: break;
        }
    }
});




