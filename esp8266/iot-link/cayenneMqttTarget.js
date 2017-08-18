function MqttTarget(opt, wtc, tspt) {
    this.mqtt = tspt.createClient(opt.transportOptions);
    this.topic = opt.topic;
    var p = this;
    this.mqtt.on('connected', function () {
        console.log('mqtt target ready');
        wtc.emit('target', p);
    });
    this.mqtt.on('disconnected', function () {
        console.log('mqtt target not ready');
        wtc.emit('target', null);
    });
    console.log('MQTT target created');
}

MqttTarget.prototype.write = function (raw, type) {
    console.log('Publishing data: ' + raw + ' type: ' + type);
    var p = this.mqtt.publish,
        t = this.topic;
    if (type === 'dht11') {
        p(t + '/temp', 'temp,c=' + raw.temp);
        p(t + '/rh', 'rel_hum,p=' + raw.rh);
    } else if (type === 'hcsr501') {
        p(t + '/motion', 'digital,d=' + (raw.state ? '1' : '0'));
    } else {
        p(t, JSON.stringify(raw));
    }
};

MqttTarget.prototype.stop = function () {};

exports.createTarget = function (opt, watcher, tspt) {
    return new MqttTarget(opt, watcher, tspt[opt.transport]);
};