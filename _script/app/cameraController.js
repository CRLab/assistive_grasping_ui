// TODO: Need to conform class to fit with other controllers

define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR *************************************************************************

    var ros = Ros.init();
    var viewer = null;

    // FUNC *************************************************************************

    function initViewer() {

        // Create the main viewer.
        var menu_container = $("#menu-container");
        var status_bar = $("#status-bar");

        var width = $(document).width() - menu_container.width();
        var height = menu_container.height() - status_bar.height();

        viewer = new ROS3D.Viewer({
            divID : 'camera-container',
            width : width,
            height : height,
            antialias : true,
            cameraPose: {
                x: 1.1536573326608544,
                y: -1.7192485002288223,
                z: 1.7035434136931575
            }
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
            path : '/package/',
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

        var recognizedBlockMarkerArrayClient = new ROS3D.MarkerArrayClient({
            ros : ros,
            tfClient : tfClient,
            topic : '/ui_recognized_objects',
            path : '/package/',
            rootObject : viewer.scene,
            loader : ROS3D.COLLADA_LOADER
        });

        var displayGraspMarkersArrayClient = new ROS3D.MarkerArrayClient({
            ros : ros,
            tfClient : tfClient,
            topic : '/ui_current_grasp',
            path : '/package/',
            rootObject : viewer.scene,
            loader : ROS3D.COLLADA_LOADER
        })
    }

    // MAIN *************************************************************************

    $(function() {
        initViewer()
    });

    // Resize viewer on window resize
    $(window).resize(function() {


        if (viewer !== null) {
            console.log(viewer.camera.position);

            viewer.resize($(document).width() - $("#menu-container").width(), $("#menu-container").height() - $("#status-bar").height())
        }
    });

});
