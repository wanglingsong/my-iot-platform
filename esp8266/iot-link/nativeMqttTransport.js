function MqttTransport(opt) {
    this.opt = opt;
    this.client = null;
    this.custOpt = null;
}

MqttTransport.prototype.connect = function (connect) {
    if (connect) {
        this.client.connect(this.custOpt);
    } else {
        this.client.disconnect();
    }
};

MqttTransport.prototype.createClient = function (options) {

    var mqttOpt = this.opt;
    if (options) {
        mqttOpt = this.opt.clone();
        Object.keys(options).forEach(function (k) {
            mqttOpt[k] = options[k];
        });
    }
    if (this.client === null) {
        var mqtt = require("mqtt");
        this.custOpt = {
            host: mqttOpt.host,
            clientid: mqttOpt.client_id || getSerial(),
            name: mqttOpt.username || undefined,
            passwd: mqttOpt.password || undefined,
            port: mqttOpt.port
        };
        if (mqttOpt.auto_reconnect) {
            mqtt.on('disconnect', function () {
                console.log("Reconnect to MQTT");
                mqtt.connect();
            });
        }

        this.client = mqtt;
        console.log('mqtt client created with options: ' + JSON.stringify(mqttOpt));
    }
    return this.client;

};

exports.createTransport = function (options) {
    return new MqttTransport(options);
};