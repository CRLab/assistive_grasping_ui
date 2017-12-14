#!/usr/bin/env node

var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var rosnodejs = require('rosnodejs');
var path = require('path');

// Because this file is in scripts we need to access 1 folder up

rosnodejs.initNode('/assistive_grasping_ui', {}).then(function() {
    const nh = rosnodejs.nh;

    rosnodejs.log.info("Running from " + __dirname);

    // Setup mustache templating
    app.engine('mustache', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/../_view');

    // Serve static files
    app.use("/_css", express.static(__dirname + '/../_css'));
    app.use("/_script", express.static(__dirname + '/../_script'));
    app.use("/_assets", express.static(__dirname + '/../_assets'));
    app.use("/_view", express.static(__dirname + '/../_view'));
    app.use("/bower_components", express.static(__dirname + "/../bower_components"));
    app.use("/package/:packageName/*", function(req, res){

        // Get absolute path to package from result
        rosnodejs.findPackage(req.params.packageName)
            .then(function(packagePath) {
                var absolutePath = path.join(packagePath, req.params[0]);
                rosnodejs.log.info("Serving file " + absolutePath);
                res.sendFile(absolutePath);
            }).catch(function(err) {
                rosnodejs.log.error("Unable to find " + req.params.packageName);
                res.status(404).send("Not found");
            });
    });

    app.get('/', function (req, res) {
        res.render('home');
    });

    var server = app.listen(8888, function () {
        rosnodejs.log.info('Example app listening on port 8888!');
    });

    // this function is called when you want the server to die gracefully
    // i.e. wait for existing connections
    var gracefulShutdown = function() {
        rosnodejs.log.info("Received kill signal, shutting down gracefully.");
        server.close(function() {
            rosnodejs.log.info("Closed out remaining connections.");
        });
    };

    // Listen for shutdown from ROS
    rosnodejs.on('shutdown', gracefulShutdown);

});


