function MqttSource(options, watcher, mqttTransport) {
    this.mqtt = mqttTransport.createClient(options.transportOptions);
    this.topic = options.topic;
    var p = this;
    this.mqtt.on('connected', function () {
        console.log('mqtt target ready');
        watcher.emit('source', p);
    });
    this.mqtt.on('disconnected', function () {
        console.log('mqtt target not ready');
        watcher.emit('source', null);
    });
    console.log('MQTT Source created');
}

MqttSource.prototype.startReading = function (callback) {
    this.mqtt.subscribe(this.topic);
    this.mqtt.on('message', function (msg) {
        callback(msg.message);
    });
};

MqttSource.prototype.stop = function () {
    // TODO unsubscribe
};

exports.createSource = function (options, watcher, transports) {
    return new MqttSource(options, watcher, transports[options.transport]);
};