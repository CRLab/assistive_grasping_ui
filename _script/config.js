requirejs.config({
    baseUrl: "/_script",
    paths: {
        app: "app",
        jquery: "../bower_components/jquery/dist/jquery",
        requirejs: "../bower_components/requirejs/require",
        mustache: "../bower_components/mustache.js/mustache",
        three: "../bower_components/three.js/build/three",
        eventemitter2: "../bower_components/eventemitter2/lib/eventemitter2",
        ros3d: "../bower_components/ros3d/src/Ros3D",
        roslib: "../bower_components/roslib/build/roslib",
        "threex-colladaloader": "../bower_components/threex-colladaloader/ColladaLoader"
    },
    shim: {

    },
    packages: [

    ]
});

