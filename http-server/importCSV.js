'use strict';
var fs = require('fs');
//var parse = require('csv-parse');
var moment = require('moment');
//var transform = require('stream-transform');
var request = require('request');

var csv = require('csv-parser');

fs.createReadStream(__dirname + '/AirQualityUCI.csv')
    .pipe(csv({separator: ';'}))
    .on('data', function (data) {
        var sensorData = {
            metricName: "CO",
            tags: {
                sensorId: "co-sensor",
                organization: "UCI"
            },
            timestamp: [moment(data.Date + ' ' + data.Time, "DD/MM/YYYY HH.mm.ss").valueOf()],
            doubles: [parseFloat(data['CO(GT)'].replace(',', '.'))]
        };

        //console.log(sensorData);
        request.post({
            url: 'http://localhost:8081/sensor',
            json: true,
            body: sensorData
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.info('Upload successful!  Server responded with:', body);
        });

    });