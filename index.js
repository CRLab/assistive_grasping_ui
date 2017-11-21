var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');

// Setup mustache templating
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/_view');

// Serve static files
app.use("/_css", express.static(__dirname + '/_css'));
app.use("/_script", express.static(__dirname + '/_script'));
app.use("/_assets", express.static(__dirname + '/_assets'));
app.use("/_view", express.static(__dirname + '/_view'));
app.use("/modules", express.static(__dirname + '/modules'));

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(8888, function () {
    console.log('Example app listening on port 8888!');
});
