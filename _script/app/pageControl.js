define(['jquery', 'mustache', 'app/actionsMenu', 'app/actionsSubmenu', 'app/inputsMenu', 'app/environmentMenu'],
        function ($, Mustache, ActionsMenu, ActionsSubmenu, InputsMenu, EnvironmentMenu) {

    // VAR **************************************************************************

    var PAGE_CONTROL_IDS = ["actionsMenu", "environmentMenu", "inputsMenu"];

    var PAGE_CONTROL_DATA = {
        "pageControls": [
            {
                "pageControlID": PAGE_CONTROL_IDS[0],
                "icon": "actions.png"
            }, {
                "pageControlID": PAGE_CONTROL_IDS[1],
                "icon": "environment.png"
            }, {
                "pageControlID": PAGE_CONTROL_IDS[2],
                "icon": "inputs.png"
            }
        ]
    };

    // MAIN **************************************************************************

    $(document).ready(function() {
        // Load page controls and mask for actions menu.
        loadPageControls();
        loadMask(PAGE_CONTROL_IDS[0]);
    });

    // FUNC **************************************************************************

    function loadPageControls() {
        $.get("/_view/pageControl.mustache", function(template) {
            var rendered = Mustache.render(template, PAGE_CONTROL_DATA);
            $('#page-control').html(rendered);

            // load menu type on page control click
            for (var i in PAGE_CONTROL_IDS) {
                (function(index) {  // Allows access to i (index) in click callback
                    $("#" + PAGE_CONTROL_IDS[index]).click(function() {
                        loadMask(PAGE_CONTROL_IDS[index]);
                        loadMenu(PAGE_CONTROL_IDS[index]);
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
        switch (menuType) {
            case PAGE_CONTROL_IDS[0]:
                if (ActionsMenu.showing()) {
                    ActionsMenu.loadCached();
                } else {
                    ActionsSubmenu.loadCached();
                }
                break;
            case PAGE_CONTROL_IDS[1]: EnvironmentMenu.load(); break;
            case PAGE_CONTROL_IDS[2]: InputsMenu.load(); break;
            default: break;
        }
    }
});




