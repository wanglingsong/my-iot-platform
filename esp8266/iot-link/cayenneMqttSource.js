function MqttSource(opt, wtc, tspt) {
    this.mqtt = tspt.createClient(opt.transportOptions);
    this.topic = opt.topic;
    var p = this;
    this.mqtt.on('connected', function () {
        console.log('mqtt source ready');
        wtc.emit('source', p);
    });
    this.mqtt.on('disconnected', function () {
        console.log('mqtt source not ready');
        wtc.emit('source', null);
    });
    console.log('MQTT Source created');
}

MqttSource.prototype.read = function (callback) {
    this.mqtt.subscribe(this.topic);
    console.log('Subscribed to topic: ' + this.topic);
    this.mqtt.on('message', function (msg) {
        console.log('Received message: ' + msg.message);
        callback(msg.message.split(',')[1], 'mqtt-sub');
    });
};

MqttSource.prototype.stop = function () {
    // TODO unsubscribe
};

exports.createSource = function (opt, wtc, tspt) {
    return new MqttSource(opt, wtc, tspt[opt.transport]);
};