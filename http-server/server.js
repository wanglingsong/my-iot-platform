'use strict';
var express = require('express');
var fivebeans = require('fivebeans');
var bodyParser = require('body-parser');

function startServer(beanstalkCilent, expressApp) {
    expressApp.post('/sensor/', function (req, res) {
        var message = JSON.stringify(req.body);
        console.info('Received message: ' + message);
        beanstalkCilent.put(0, 0, 10, message, function (err, jobid) {
            if (err) {
                console.error('error on putting message: ' + err);
            } else {
                console.info(jobid);
            }
        });
        res.send('OK');
    });
    expressApp.listen(8080);
}

var app = express();
app.use(bodyParser.json());

var client = new fivebeans.client('beanstalk', 11300);
client
    .on('connect', function () {
        // client can now be used
        client.use("sensor_data", function (err, tubename) {
            if (!err) {
                console.info('Use tube: ' + tubename);
                startServer(client, app);
            } else {
                console.error('error on using tube: ' + err);
            }
        });
    })
    .on('error', function (err) {
        // connection failure
        console.error('error on connect: ' + err);
    })
    .on('close', function () {
        // underlying connection has closed
        console.info('beanstalk client closed');
    })
    .connect();