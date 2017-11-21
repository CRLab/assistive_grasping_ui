// NOTE: Don't need openni

function init() {

    // Connect to ROS.
    var ros = new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    });

    // Create the main viewer.
    var viewer = new ROS3D.Viewer({
        divID : 'viewer',
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
        fixedFrame : '/kinect2/sd/points'
    });

    // Setup Kinect DepthCloud stream
    var depthCloud = new ROS3D.DepthCloud({
        url : 'http://'+window.location.hostname + ':9999/streams/depthcloud_encoded.webm',
        f : 525.0
    });
    depthCloud.startStream();

    // Create Kinect scene node
    var kinectNode = new ROS3D.SceneNode({
        frameID : '/kinect2_rgb_optical_frame',
        tfClient : tfClient,
        object : depthCloud
    });
    viewer.scene.add(kinectNode);

}

init();