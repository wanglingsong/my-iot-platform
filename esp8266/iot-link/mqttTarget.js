function MqttTarget(options, watcher, mqttTransport) {
    this.mqtt = mqttTransport.createClient(options.transportOptions);
    this.topic = options.topic;
    var p = this;
    this.mqtt.on('connected', function() {
        console.log('mqtt target ready');
        watcher.targetReady(p);
    });
    this.mqtt.on('disconnected', function() {
        console.log('mqtt target not ready');
        watcher.targetReady(null);
    });
    console.log('MQTT target created');
}

MqttTarget.prototype.write = function(data) {
    //console.log('Publishing data ' + JSON.stringify(data) + ' to topic: ' + this.topic);
    this.mqtt.publish(this.topic, JSON.stringify(data));
}

MqttTarget.prototype.stop = function() {}

exports.createTarget = function(options, watcher, transports) {
    return new MqttTarget(options, watcher, transports[options.transport]);
}