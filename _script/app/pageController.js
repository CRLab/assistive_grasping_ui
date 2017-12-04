define(['jquery', 'mustache', 'app/actions-menu/actionsMenu', 'app/actions-menu/actionsSubmenu', 'app/inputs-menu/inputsMenu', 'app/environment-menu/environmentMenu'],
        function ($, Mustache, ActionsMenu, ActionsSubmenu, InputsMenu, EnvironmentMenu) {

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
        // Load page controls and mask for actions menu.
        loadPageControls();
        loadMask(PAGE_CONTROL_IDS.ACTIONS);
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
        // TODO: Fill in
        EnvironmentMenu.setShowing(false);
        InputsMenu.setShowing(false);

        switch (menuType) {
            case PAGE_CONTROL_IDS.ACTIONS:
                if (ActionsMenu.showing()) {
                    ActionsMenu.loadCached();
                } else {
                    ActionsSubmenu.loadCached();
                }
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




