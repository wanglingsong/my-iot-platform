let wifi = require('Wifi');

export class NetworkWifi {

    constructor(config) {
        this.ssid = config.ssid;
        this.password = config.password;
    }

    connect() {
        wifi.connect(this.ssid, {
            password: this.password
        }, function (err) {
            console.log("connected? err=", err, "info=", wifi.getIP());
        });
    }

    disconnect() {}

    on(event, callback) {
        wifi.on(event, function (details) {
            callback(details);
        });
    }

}