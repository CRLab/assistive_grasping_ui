// TODO: Need to conform class to fit with other controllers

define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR *************************************************************************

    var ros = Ros.init();
    var viewer = null;

    // FUNC *************************************************************************

    function initViewer() {

        // Create the main viewer.
        viewer = new ROS3D.Viewer({
            divID : 'camera-container',
            width : $(document).width() - $("#menu-container").width(),
            height : $("#menu-container").height() - $("#status-bar").height(),
            antialias : true
        });
        // Setup a client to listen to TFs.
        var tfClient = new ROSLIB.TFClient({
            ros : ros,
            angularThres : 0.01,
            transThres : 0.01,
            rate : 10.0,
            fixedFrame : '/world'
        });

        viewer.addObject(new ROS3D.Grid());

        // Setup the URDF client.
        var urdfClient = new ROS3D.UrdfClient({
            ros : ros,
            tfClient : tfClient,
            path : '/resources/',
            rootObject : viewer.scene,
            loader : ROS3D.COLLADA_LOADER
        });

        var cloudClient = new ROS3D.PointCloud2({
            ros: ros,
            tfClient: tfClient,
            rootObject: viewer.scene,
            max_pts: 13000,
            topic: '/filtered_pc'
        });

        var markerArrayClient = new ROS3D.MarkerArrayClient({
            ros : ros,
            tfClient : tfClient,
            topic : '/objrec_node/recognized_objects_markers',
            rootObject : viewer.scene
        });
    }

    // MAIN *************************************************************************

    $(function() {
        initViewer()
    });

    // Resize viewer on window resize
    $(window).resize(function() {
        if (viewer !== null) {
            viewer.resize($(document).width() - $("#menu-container").width(), $("#menu-container").height() - $("#status-bar").height())
        }
    });

});
