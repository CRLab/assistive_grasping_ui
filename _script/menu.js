var animating = false;
var loadingSubmenu = false;
var numMenuOptions = -1;
var currMenuOption = -1;
var menuLayer = 1;   // The layer (depth) of the menu shown


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
    var buttonClass = menuLayer == 1 ? '.menu-button-outline' : '.submenu-button';

    if (isOn) {
        // Select binary menu item or first item in list
        var currElement = $("#SMG");
        if (!currElement.length) { // checks existence
            currElement = $(buttonClass).eq(0);
        }
        currElement.addClass("menu-button-outline-hovered");

        // Update Num menu options and get current menu option
        numMenuOptions = 0;
        $(buttonClass).each(function(i) {
            numMenuOptions += 1;
            if ($(this).hasClass("menu-button-outline-hovered")) {
                currMenuOption = i;
            }
         });

         // Change highlighted item or trigger menu item click event on key press
         $(window).keypress(function(e) {
             var key = e.which;
             if (key == DOWN_KEY) {
                 $(buttonClass).eq(currMenuOption).removeClass("menu-button-outline-hovered");
                 currMenuOption = (currMenuOption+1) % numMenuOptions;
                 $(buttonClass).eq(currMenuOption).addClass("menu-button-outline-hovered");
             } else if (key == SELECT_KEY) {
                  $(buttonClass).eq(currMenuOption).trigger("click");
             }
         });

    } else {
        // Remove any selection
        $(buttonClass).each(function(i) {
            $(this).removeClass("menu-button-outline-hovered");
        });

        // Remove keypress listener
        $(window).unbind("keypress");

        // // Select click button
        // $("#MOUSE").addClass("menu-button-outline-hovered");
    }
}


// turn on/off click menu
function toggleClickMenu(isOn) {
    var buttonClass = menuLayer == 1 ? '.menu-button-outline' : '.submenu-button';

    if (isOn) {
        //enable hovering
        $(buttonClass).hover(function() {    // mousin
            $(this).addClass("menu-button-outline-hovered");
        }, function() {    // mousout
            if (!animating) {
                $(this).removeClass("menu-button-outline-hovered");
            }
        });
    } else {
        // disable hovering
        $(buttonClass).unbind('mouseenter mouseleave');
    }
}


// Setup menu button clicks
function setupMenuButtonClick(submenuData, selectedEventCallback) {
    $(".menu-button-outline").click(function() {

        // Ensure not clicking whil in binary mode
        if (inputType == INPUTS.CLICK ||
            ($(".menu-button-outline-hovered").attr("id")) ==  $(this).attr("id")) {

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
                menuLayer = 2;
                loadingSubmenu = true;
                $.get('/_view/submenu.mustache', function(template) {

                    // Set title of selecte button in submenu
                    submenuData.selectedMenuItem = $(".menu-button-outline-hovered").attr("id");

                    var rendered = Mustache.render(template, submenuData);
                    $('#menu-injection').html(rendered);

                    // Send callback message when menu option was clicked
                    setupClickCallback(selectedEventCallback)

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
        setupClickCallback(selectedEventCallback)
    });
}


// end callback id of clicked button
function setupClickCallback(callback) {
    var buttonClass = menuLayer == 1 ? '.menu-button-outline' : '.submenu-button';

    if (callback != null) {
        var buttonIDs = [];
        $(buttonClass).each(function(i) {
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
