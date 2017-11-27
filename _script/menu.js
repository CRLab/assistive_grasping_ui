//Load common code that includes config, then load the app logic for this page.
require(['./common'], function (common) {
    require(['app/pageController']);
    require(['app/actionsMenuController']);
    require(['app/mouseController']);
    // require(['app/pointCloud']);
});