export function startWifi(client, ssid, wifiPassword) {

    let wifi = require('Wifi');
    wifi.on('connected', function (details) {
        console.log("connected: detail=", details);
    });

    wifi.on('disconnected', function (details) {
        console.log("disconnected: detail=", details);
    });

    wifi.connect(ssid, {
        password: wifiPassword
    }, function (err) {
        console.log("connected? err=", err, "info=", wifi.getIP());
        if (!err) {
            client.connect();
        }
    });

}