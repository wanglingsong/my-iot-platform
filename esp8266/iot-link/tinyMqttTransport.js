function MqttTransport(opt) {
    this.opt = opt;
    this.pool = [];
}

MqttTransport.prototype.connect = function (connect) {
    this.pool.forEach(function (c) {
        if (connect) {
            c.connect();
            console.log('Try to connect to mqtt');
        } else {
            c.disconnect();
        }
    });
};

MqttTransport.prototype.createClient = function (options) {

    function createMqttCilent(mqttOpt) {
        var mqtt = require("tinyMQTT")
            .create(mqttOpt.host, {
                client_id: mqttOpt.client_id || getSerial(),
                username: mqttOpt.username || undefined,
                password: mqttOpt.password || undefined,
                port: mqttOpt.port
            });
        if (mqttOpt.auto_reconnect) {
            mqtt.on('disconnected', function () {
                console.log("Reconnect to MQTT");
                mqtt.connect();
            });
        }
        return mqtt;
    }

    var mqttOpt = this.opt;
    if (options) {
        mqttOpt = this.opt.clone();
        Object.keys(options).forEach(function (k) {
            mqttOpt[k] = options[k];
        });
    }
    if (mqttOpt.dedicatedClient || this.pool.length === 0) {
        var mqtt = createMqttCilent(mqttOpt);
        this.pool.push(mqtt);
        console.log('mqtt client created with options: ' + JSON.stringify(mqttOpt));
        return mqtt;
    } else {
        return this.pool[0];
    }

};

exports.createTransport = function (options) {
    return new MqttTransport(options);
};