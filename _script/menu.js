//Load common code that includes config, then load the app logic for this page.
require(['./common'], function (common) {
    require(['app/pageController']);
    require(['app/actions-menu/actionsMenuController']);
    require(['app/mouseController']);
    // require(['app/pointCloud']);
});