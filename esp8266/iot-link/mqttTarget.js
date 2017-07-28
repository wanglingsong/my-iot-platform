function MqttTarget(options, watcher, mqttTransport) {
    this.mqtt = mqttTransport.createClient(options.mqtt);
    this.topic = options.topic;
    var p = this;
    this.mqtt.on('connected', function() {
        watcher.targetReady(p);
    });
    this.mqtt.on('disconnected', function() {
        watcher.targetReady(null);
    });
}

MqttTarget.prototype.write = function(data) {
    //console.log('Publishing data ' + JSON.stringify(data) + ' to topic: ' + this.topic);
    this.mqtt.publish(this.topic, JSON.stringify(data));
}

MqttTarget.prototype.stop = function() {}

exports.createTarget = function(mqttTransport, options, watcher) {
    return new MqttTarget(mqttTransport, options, watcher);
}