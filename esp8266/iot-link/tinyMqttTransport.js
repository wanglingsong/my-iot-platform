function MqttTransport(options) {
    this.options = options;
    this.clientPool = [];
}

MqttTransport.prototype.connect = function(connect) {
    this.clientPool.forEach(function(c) {
        if (connect) {
            c.connect();
            console.log('Try to connect to mqtt');
        } else {
            c.disconnect();
        }
    });
}

MqttTransport.prototype.createClient = function(options) {
    var mqttOpt = this.options;
    if (options) {
        mqttOpt = this.options.clone();
        for (var prop in options) {
            mqttOpt[prop] = options[prop];
        }
    }
    if (mqttOpt.dedicatedClient || this.clientPool.length === 0) {
        var mqtt = createMqttCilent(mqttOpt);
        this.clientPool.push(mqtt);
        console.log('mqtt client created with options: ' + JSON.stringify(mqttOpt));
        return mqtt;
    } else {
        return this.clientPool[0];
    }
}

function createMqttCilent(mqttOpt) {
    var mqtt = require("https://github.com/olliephillips/tinyMQTT/blob/master/tinyMQTT.min.js")
        .create(mqttOpt.host, {
            username: mqttOpt.username || undefined,
            password: mqttOpt.password || undefined,
            port: mqttOpt.port
        });
    if (mqttOpt.auto_reconnect) {
        mqtt.on('disconnected', function() {
            console.log("Reconnect to MQTT");
            mqtt.connect();
        });
    }
    return mqtt;
}

exports.createTransport = function(options) {
    return new MqttTransport(options);
}