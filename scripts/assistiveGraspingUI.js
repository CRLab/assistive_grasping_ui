#!/usr/bin/env node

var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var rosnodejs = require('rosnodejs');
var spawn = require('child-process-promise').spawn;
var path = require('path');

console.log("Running from " + __dirname);

// Because this file is in scripts we need to access 1 folder up

rosnodejs.initNode('/assistive_grasping_ui', {}).then(function() {
    const nh = rosnodejs.nh;

    // Setup mustache templating
    app.engine('mustache', mustacheExpress());
    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/../_view');

    // Serve static files
    app.use("/_css", express.static(__dirname + '/../_css'));
    app.use("/_script", express.static(__dirname + '/../_script'));
    app.use("/_assets", express.static(__dirname + '/../_assets'));
    app.use("/_view", express.static(__dirname + '/../_view'));
    app.use("/package/:packageName/*", function(req, res){

        // Get absolute path to package from result
        var promise = spawn('python', [path.join(__dirname, 'ros_package_finder.py'), req.params.packageName], { capture: ['stdout'] });

        promise.then(function(result) {
            var packagePath = result.stdout.toString();

            if(packagePath === "Not Found") {
                console.log("Unable to find " + req.params.packageName);
                res.status(404).send("Not found");
            } else {
                var absolutePath = path.join(packagePath.replace("\n", ""), req.params[0]);
                console.log("Serving file " + absolutePath);
                res.sendFile(absolutePath);
            }
        })
        .catch(function(err) {
            console.log("Python script failed " + err);
            res.status(404).send("Not found");
        });
    });

    app.get('/', function (req, res) {
        res.render('home');
    });

    var server = app.listen(8888, function () {
        console.log('Example app listening on port 8888!');
    });

    // this function is called when you want the server to die gracefully
    // i.e. wait for existing connections
    // TODO: Handle unregister node, weird bug
    var gracefulShutdown = function() {
        console.log("Received kill signal, shutting down gracefully.");
        server.close(function() {
            console.log("Closed out remaining connections.");
            process.exit()
        });

        // if after
        setTimeout(function() {
            console.error("Could not close connections in time, forcefully shutting down");
            rosnodejs.shutdown();
            process.exit()
        }, 10*1000);
    };

    // listen for TERM signal .e.g. kill
    process.on ('SIGTERM', gracefulShutdown);

    // listen for INT signal e.g. Ctrl-C
    process.on ('SIGINT', gracefulShutdown);

    // Listen for shutdown from ROS
    rosnodejs.on('shutdown', gracefulShutdown);

});


