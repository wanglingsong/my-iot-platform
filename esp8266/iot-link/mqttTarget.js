export class MqttTarget {

    constructor(mqttTransport, options) {
        this.mqtt = mqttTransport.createClient(options.mqtt);
        this.topic = options.topic;
    }

    onConnected(callback) {
        this.mqtt.on('connected', callback);
    }

    onDisconnected(callback) {
        this.mqtt.on('disconnected', callback);
    }

    write(data) {
        //console.log('Publishing data ' + JSON.stringify(data) + ' to topic: ' + this.topic);
        this.mqtt.publish(this.topic, JSON.stringify(data));
    }

}