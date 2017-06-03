class MqttClient {

    constructor(mqtt) {
        this.mqtt = mqtt;
    }

    connect() {
        this.mqtt.connect();
    }

    submit(data) {}

    publish(topic, data) {
        this.mqtt.publish(topic, data);
    }

    subscribe(topic, callback) {
        this.mqtt.subscribe(topic, callback);
    }

    onConnected(callback) {
        this.mqtt.on("connected", callback);
    }

    onDisconnected(callback) {
        this.mqtt.on("disconnected", callback);
    }

}

export function createMqttClient(mqttHost, mqttPort, autoReconnect, mqttOpt) {
    let opt = { // all optional - the defaults are below
        // client_id: DEVICE_ID, // the client ID sent to MQTT - it's a good idea to define your own static one based on `getSerial()`
        // reconnect_interval: 30000,
        keep_alive: 300, // keep alive time in seconds
        port: mqttPort, // port number
        clean_session: true,
        // username: "username", // default is undefined
        // password: "password",  // default is undefined
        protocol_name: "MQTT", // or MQIsdp, etc..
        protocol_level: 4 // protocol level
    };
    for (var prop in mqttOpt) {
        opt[prop] = mqttOpt[prop];
    }
    let mqtt = require("MQTT").create(mqttHost, opt);
    mqtt.C.RECONNECT_INTERVAL = 300000;
    mqtt.C.PING_INTERVAL = 300;
    if (autoReconnect) {
        mqtt.on('disconnected', function () {
            console.log("Reconnect to MQTT");
            mqtt.connect();
        });
    }
    return mqtt;
};

export function createCilent(mqttConfig, mqttOpt) {
    return new MqttClient(createMqttClient(mqttConfig.host, mqttConfig.port, mqttConfig.autoReconnect, mqttOpt));
}