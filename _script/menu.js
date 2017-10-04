var animating = false;
var loadingSubmenu = false;

// Input types
var INPUTS = {
    SPEECH: 0,
    CLICK: 1,
    BINARY: 2
};
var inputType = INPUTS.CLICK;


// Alter the menu button when hovered over
function initMenuButtonHover() {
    $(".menu-button-outline").hover(function() {    // mousin
        $(this).addClass("menu-button-outline-hovered");
        $(this).siblings("text").show();

        $(this).siblings(".menu-button-icon").attr({
            height: 30,
            width: 30,
            y: '20%',
            x: '36%'
        });

    }, function() {    // mousout
        if (!animating) {
            $(this).removeClass("menu-button-outline-hovered");
            $(this).siblings("text").hide();

            $(this).siblings(".menu-button-icon").attr({
                height: 40,
                width: 40,
                y: '30%',
                x: '30%'
            });
        }
    });
}


// Setup menu button clicks
function setupMenuButtonClick(submenuData) {
    $(".menu-button-outline").click(function() {
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
            complete: showSubmenu(selectedButton, animHeight, submenuData)
        });
    });
}


// Show the submenu (animated) with the given mustache data
function showSubmenu(selectedButton, animHeight, submenuData) {
    selectedButton.animate({
        top: -animHeight + "px"
    }, {
        complete: function() {

            if (!loadingSubmenu) {
                loadingSubmenu = true;
                $.get('/_view/submenu.mustache', function(template) {
                    var rendered = Mustache.render(template, submenuData);
                    $('#menu-injection').html(rendered);

                    $('.submenu-button, .submenu-spacer').css("left", "-150px");
                    var anim = {left: "0px"};
                    $('.submenu-button').animate(anim, {duration: 400});
                    $('.submenu-spacer').animate(anim, {duration: 200});
                });
            }
        }
    });
}


// Show the menu with the given mustache data. If no submenu is needed,
// pass in submenuData=null
function showMenu(menuMaskData, menuData, submenuData) {
    animating = false;
    loadingSubmenu = false;

    // Load menu page control mask
    $.get('/_view/menuMask.mustache', function(template) {
        var rendered = Mustache.render(template, menuMaskData);
        $('#menu-mask-injection').html(rendered);
    });

    // Load menu
    $.get('/_view/menu.mustache', function(template) {
        var rendered = Mustache.render(template, menuData);
        $('#menu-injection').html(rendered);
        initMenuButtonHover();

        if (submenuData != null) {
            setupMenuButtonClick(submenuData);
        }
    });
}
