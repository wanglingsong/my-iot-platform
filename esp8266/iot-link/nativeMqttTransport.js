function MqttTransport(opt) {
    this.opt = opt;
    this.mqtt = require("mqtt");
}

MqttTransport.prototype.connect = function (connect) {
    if (connect) {
        this.mqtt.connect(this.custOpt);
    } else {
        this.mqtt.disconnect();
    }
};

MqttTransport.prototype.createClient = function (options) {

    var mqttOpt = this.opt,
        mqtt = this.mqtt;
    if (options) {
        mqttOpt = this.opt.clone();
        Object.keys(options).forEach(function (k) {
            mqttOpt[k] = options[k];
        });
    }
    if (!this.custOpt) {
        this.custOpt = {
            host: mqttOpt.host,
            clientid: mqttOpt.client_id || getSerial(),
            name: mqttOpt.username || undefined,
            passwd: mqttOpt.password || undefined,
            port: mqttOpt.port
        };
        if (mqttOpt.auto_reconnect) {
            mqtt.on('disconnect', function () {
                //console.log("Reconnect to MQTT");
                mqtt.connect(this.custOpt);
            });
        }

        //console.log('mqtt client created with options: ' + JSON.stringify(mqttOpt));
    }
    return mqtt;

};

exports.createTransport = function (options) {
    return new MqttTransport(options);
};