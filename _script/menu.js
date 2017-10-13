var BUTTON_CLASSES = [".menu-button", ".submenu-button"];
var PAGE_CONTROL_CLASS = ".page-control-button";
var HOVERED_CLASS = "hovered";

var currMenuClass = BUTTON_CLASSES[0];  // indicates whether we are in the menu or submenu
var animating = false;                  // Indicates if we are in the middle of an animation
var loadingSubmenu = false;
var currMenuOption = -1;

// Input types
var INPUTS = {
    CLICK: 0,
    BINARY: 1
};
var inputType = INPUTS.CLICK;

// Key presses
var DOWN_KEY = 115;
var SELECT_KEY = 13;


// turn on/off binary menu
function toggleBinaryMenu(isOn) {
    if (isOn) {
        // Select binary menu item or first item in list
        var currElement = $("#sEMG");
        if (!currElement.length) { // checks existence
            currElement = $(currMenuClass).eq(0);
        }
        currElement.addClass(HOVERED_CLASS);

        // Fill the menu options with menu buttons and page control buttons
        menuOptions = [];
        $(currMenuClass).each(function(i) {
            menuOptions.push(this);
            if ($(this).hasClass(HOVERED_CLASS)) {
                currMenuOption = i;
            }
         });
         $(PAGE_CONTROL_CLASS).each(function(i) {
             menuOptions.push(this);
          });

         // Change highlighted item or trigger menu item click event on key press
         $(window).keypress(function(e) {
             var key = e.which;

             if (animating) { return; }

             if (key == DOWN_KEY) {
                 $(menuOptions[currMenuOption]).removeClass(HOVERED_CLASS);
                 currMenuOption = (currMenuOption+1) % menuOptions.length;
                 $(menuOptions[currMenuOption]).addClass(HOVERED_CLASS);
             } else if (key == SELECT_KEY) {
                 $(menuOptions[currMenuOption]).trigger("click");
             }
         });

    } else {
        // Remove any selection
        $(currMenuClass).each(function(i) {
            $(this).removeClass(HOVERED_CLASS);
        });
        $(PAGE_CONTROL_CLASS).each(function(i) {
            $(this).removeClass(HOVERED_CLASS);
        });

        // Remove keypress listener
        $(window).unbind("keypress");

        // // Select click button
        // $("#MOUSE").addClass("menu-button-outline-hovered");
    }
}


// turn on/off click menu
function toggleClickMenu(isOn) {
    if (isOn) {
        //enable hovering
        $(currMenuClass).hover(function() {    // mousin
            $(this).addClass(HOVERED_CLASS);
        }, function() {    // mousout
            if (!animating) {
                $(this).removeClass(HOVERED_CLASS);
            }
        });

        $(PAGE_CONTROL_CLASS).hover(function() {    // mousin
            $(this).addClass(HOVERED_CLASS);
        }, function() {    // mousout
            $(this).removeClass(HOVERED_CLASS);
        });
    } else {
        // disable hovering
        $(currMenuClass).unbind('mouseenter mouseleave');
        $(PAGE_CONTROL_CLASS).unbind('mouseenter mouseleave');
    }
}


// Setup menu button click to show the submenu
function setupMenuButtonClick(submenuData, selectedEventCallback) {
    $(BUTTON_CLASSES[0]).click(function() {
        // Ensure not clicking while in binary mode
        if (inputType == INPUTS.CLICK ||
            ($(BUTTON_CLASSES[0] + "." + HOVERED_CLASS).attr("id")) ==  $(this).attr("id")) {

            var circleHeight = 100;
            var selectedButton = $(this).parent().parent();
            var animHeight = selectedButton.prevAll().length*selectedButton.height() +
                             0.5 * selectedButton.height() -
                             0.5 * circleHeight -
                             25;

            animating = true;
            selectedButton.siblings().animate({
                right: '150'
            }, {
                duration: 200,
                complete: showSubmenu(selectedButton, animHeight, submenuData, selectedEventCallback)
            });
        }
    });
}


// Show the submenu (animated) with the given mustache data
function showSubmenu(selectedButton, animHeight, submenuData, selectedEventCallback) {
    selectedButton.animate({
        top: -animHeight + "px"
    }, {
        complete: function() {

            if (!loadingSubmenu) {
                currMenuClass = BUTTON_CLASSES[1];
                loadingSubmenu = true;
                $.get('/_view/submenu.mustache', function(template) {

                    // Set title of selecte button in submenu
                    submenuData.selectedMenuItem = $(BUTTON_CLASSES[0] + "." + HOVERED_CLASS).attr("id");

                    var rendered = Mustache.render(template, submenuData);
                    $('#menu-injection').html(rendered);

                    // Send callback message when menu option was clicked
                    setupClickCallback(selectedEventCallback);

                    // animate
                    $('.submenu-button, .submenu-spacer').css("left", "-150px");
                    var anim = {left: "0px"};
                    $('.submenu-spacer').animate(anim, {duration: 200});
                    $('.submenu-button').animate(anim, {
                        duration: 400,
                        complete: function() { animating = false; }
                    });

                    setupInputType(inputType); // Setup listeners
                });
            }
        }
    });
}


// Show the menu with the given mustache data. If no submenu is needed,
// pass in submenuData=null
function showMenu(menuMaskData, menuData, submenuData=null, selectedEventCallback=null) {
    animating = false;
    loadingSubmenu = false;
    menuLayer = 1;
    currMenuClass = BUTTON_CLASSES[0];

    // Load menu page control mask
    $.get('/_view/menuMask.mustache', function(template) {
        var rendered = Mustache.render(template, menuMaskData);
        $('#menu-mask-injection').html(rendered);
    });

    // Load menu
    $.get('/_view/menu.mustache', function(template) {
        var rendered = Mustache.render(template, menuData);
        $('#menu-injection').html(rendered);

        // Toggle correct menu based on input type
        setupInputType(inputType);

        // ready submenu if present
        if (submenuData != null) {
            setupMenuButtonClick(submenuData, selectedEventCallback);
        }

        // Send callback message when menu option was clicked
        setupClickCallback(selectedEventCallback);
    });
}


// end callback id of clicked button
function setupClickCallback(callback) {
    if (callback != null) {
        var buttonIDs = [];
        $(currMenuClass).each(function(i) {
            buttonIDs.push($(this).attr('id'));
            $(this).click(function() {
                callback(buttonIDs[i]);
            });
        });
    }
}


// Setup a specific menu input type
function setupInputType(type) {
    inputType = type;
    if (inputType == INPUTS.CLICK) {
        toggleBinaryMenu(false);
        toggleClickMenu(false); // clears all event listeners so they don't double up
        toggleClickMenu(true);
    } else if (inputType == INPUTS.BINARY) {
        toggleClickMenu(false);
        toggleBinaryMenu(false); // clears all event listeners so they don't double up
        toggleBinaryMenu(true);
    }
}
