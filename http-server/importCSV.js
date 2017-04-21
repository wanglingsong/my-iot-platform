'use strict';
var fs = require('fs');
//var parse = require('csv-parse');
var moment = require('moment');
//var transform = require('stream-transform');
var request = require('request');

var csv = require('csv-parser');

function uploadData(metric, sensorId, data, dataField) {
    var sensorData = {
        metricName: metric,
        tags: {
            sensorId: sensorId,
            organization: "UCI"
        },
        timestamp: [moment(data.Date + ' ' + data.Time, "DD/MM/YYYY HH.mm.ss").valueOf()],
        doubles: [parseFloat(data[dataField].replace(',', '.'))]
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
        //console.info('Upload successful!  Server responded with:', body);
    });
}

fs.createReadStream(__dirname + '/AirQualityUCI.csv')
    .pipe(csv({
        separator: ';'
    }))
    .on('data', function (data) {
        //uploadData('CO', 'sensor1', data, 'CO(GT)');
        //uploadData('NMHC', 'sensor2', data, 'NMHC(GT)');
        //uploadData('C6H6', 'sensor3', data, 'C6H6(GT)');
        uploadData('NOx', 'sensor4', data, 'NOx(GT)');

        
    });