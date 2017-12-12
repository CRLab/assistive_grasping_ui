//Load common code that includes config, then load the app logic for this page.
require(['./config'], function (common) {
    require(['app/stateController']);
    require(['app/pageController']);
    // require(['app/debug_mouseController']);
    require(['app/mouseController']);
    require(['app/cameraController']);
});