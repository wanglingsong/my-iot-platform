function MqttTransport(options) {
    this.options = options;
    this.clientPool = [];
}

MqttTransport.prototype.connect = function (connect) {
    this.clientPool.forEach(function (c) {
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
        var opt = { // all optional - the defaults are below
            client_id: mqttOpt.client_id || getSerial(), // the client ID sent to MQTT - it's a good idea to define your own static one based on `getSerial()`
            keep_alive: mqttOpt.keep_alive || 30, // keep alive time in seconds
            port: mqttOpt.port, // port number
            clean_session: mqttOpt.clean_session || true,
            username: mqttOpt.username || undefined, // default is undefined
            password: mqttOpt.password || undefined, // default is undefined
            protocol_name: "MQTT", // or MQIsdp, etc..
            protocol_level: 4 // protocol level
        };
        var mqtt = require("MQTT").create(mqttOpt.host, opt);
        mqtt.C.RECONNECT_INTERVAL = (mqttOpt.reconnect_interval || 30) * 1000;
        mqtt.C.PING_INTERVAL = mqttOpt.ping_interval || 30;
        if (mqttOpt.auto_reconnect) {
            mqtt.on('disconnected', function () {
                console.log("Reconnect to MQTT");
                mqtt.connect();
            });
        }
        return mqtt;
    }

    var mqttOpt = this.options;
    if (options) {
        mqttOpt = this.options.clone();
        Object.keys(options).forEach(function (k) {
            mqttOpt[k] = options[k];
        });
    }
    if (mqttOpt.dedicatedClient || this.clientPool.length === 0) {
        var mqtt = createMqttCilent(mqttOpt);
        this.clientPool.push(mqtt);
        console.log('mqtt client created with options: ' + JSON.stringify(mqttOpt));
        return mqtt;
    } else {
        return this.clientPool[0];
    }
};

exports.createTransport = function (options) {
    return new MqttTransport(options);
};