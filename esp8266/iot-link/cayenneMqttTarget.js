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
    //console.log('Publishing data: ' + raw + ' type: ' + type);
    var p = this,
        t = p.topic;

    function pub(t, m) {
        //console.log('Publishing message ' + m + ' to ' + t);
        p.mqtt.publish({
            topic: t,
            message: m
        });
    }

    if (type === 'dht11') {
        pub(t + '/temp', 'temp,c=' + raw.temp);
        pub(t + '/rh', 'rel_hum,p=' + raw.rh);
    } else if (type === 'gpio') {
        pub(t + '/motion', 'digital,d=' + (raw.state ? '1' : '0'));
    }
    // else {
        //pub(t, JSON.stringify(raw));
    //}
};

MqttTarget.prototype.stop = function () {};

exports.createTarget = function (opt, wtc, tspt) {
    return new MqttTarget(opt, wtc, tspt[opt.transport]);
};