// initialize plugins
var express = require('express');
var bodyParser = require('body-parser');
var requirejs = require('requirejs');
// for readint/merging configurations
var nconf = require('nconf');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bundleRouter = express.Router();

// setup nconf heirarchy
nconf.argv().file({
    file: "build-conf.json"
});

// set default for requireConf
nconf.defaults({
    baseUrl: 'app/scripts',
    paths: [
        // add any additional paths which are outside
        // baseUrl
    ],
    optimize: 'none',
    name: 'main',
    // paths of all other required modules
    include: [],
    // out file where all the bundled code will
    // be dumped
    // TODO: this should be read from config
    out: 'tmp/main-bundle.js'
});


console.dir(nconf.get());

bundleRouter.route('/bundle')
    // get call for bundling
    .get(function  (req,res) {
        var reqModules = [];
        if(req.query.modules) {
            reqModules = req.query.modules.split(',');
        }

        // TODO: we should extend requireConfig to not to change
        // original object
        nconf.set("include", reqModules);
        var requireConfig = nconf.get();
        requirejs.optimize(requireConfig, function (buildResponse) {
            // buildResponse is just the console output
            // of requirejs optimizer. We need to read the
            // out file for output.
            res.set({
                'Content-Type': 'application/javascript;charset=UTF-8',
                'Content-Length': buildResponse.length
            });
            var buildContent = fs.readFileSync(requireConfig.out, "utf8");
            res.send(buildContent);
        }, function (err) {
            console.error(err);
            res.set({
                'Content-Type': 'text/plain'
            });
            res.status(500).send("Some error occured! See your server console for more info.");
        });
    });

app.use('/scripts', bundleRouter);

// start listening
app.listen(port, function () {
    console.log('server started at port: ', port);
});
