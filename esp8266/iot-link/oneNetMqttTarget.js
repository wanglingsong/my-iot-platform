function MqttTarget(opt, wtc, tspt) {
    this.mqtt = tspt.createClient(opt.transportOptions);
    this.topic = opt.topic;
    var p = this;
    this.mqtt.on('connect', function () {
        //console.log('mqtt target ready');
        wtc.emit('target', p);
    });
    this.mqtt.on('disconnect', function () {
        //console.log('mqtt target not ready');
        wtc.emit('target', null);
    });
    //console.log('MQTT target created');
}

MqttTarget.prototype.write = function (raw, type) {
    if (type === 'dht11') {
        this.publish('{"temp": ' + raw.temp + ',"rh":' + raw.rh + '}');
    } else if (type === 'gpio') {
        this.publish('{"motion": ' + raw.state + '}');
    }
    // else {
    //    this.publish(JSON.stringify(raw));
    //}
};

MqttTarget.prototype.publish = function (data) {
    var length = data.length,
        buffer = new ArrayBuffer(3),
        dataView = new DataView(buffer);
    dataView.setUint8(0, 3); // type 3
    dataView.setUint16(1, length);
    var header = E.toString(buffer);
    this.mqtt.publish({
        topic: this.topic,
        message: header + data
    });
    //console.log('Published data: ' + data + ' to topic: ' + this.topic);
};

MqttTarget.prototype.stop = function () {};

exports.createTarget = function (opt, watcher, tspt) {
    return new MqttTarget(opt, watcher, tspt[opt.transport]);
};