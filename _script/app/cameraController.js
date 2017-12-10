// TODO: Need to conform class to fit with other controllers

define(['jquery', 'app/ros/ros'], function ($, Ros) {

    // VAR *************************************************************************
    $(function() {
        var ros = Ros.init();
        console.log(ros);

        // Create the main viewer.
        var viewer = new ROS3D.Viewer({
            divID : 'camera-container',
            width : 800,
            height : 600,
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
    });


});
