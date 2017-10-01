function Dht11Source(opt, wtc) {
    //this.dht = require('DHT11').connect(opt.pin);
    this.opt = opt;
    //this.pin = opt.pin;
    //this.itvl = opt.interval || 600000;
    //this.tofs = opt.tOffset || 0;
    //this.hofs = opt.hOffset || 0;
    //this.iid = null;
    wtc.emit('source', this);
    //console.log('DHT11 source created with option: ' + JSON.stringify(opt));
}

Dht11Source.prototype.read = function (callback) {

    if (!this.iid) {
        var p = this,
            pin = p.opt.pin;
        p.iid = setInterval(function () {
            var d = "";
            pinMode(pin); // set pin state to automatic
            digitalWrite(pin, 0);
            var watch = setWatch(function (t) {
                d += 0 | (t.time - t.lastTime > 0.00005);
            }, pin, {
                edge: 'falling',
                repeat: true
            });
            setTimeout(function () {
                pinMode(pin, 'input_pullup');
            }, 1);
            setTimeout(function () {
                clearWatch(watch);
                var cks =
                    parseInt(d.substr(2, 8), 2) +
                    parseInt(d.substr(10, 8), 2) +
                    parseInt(d.substr(18, 8), 2) +
                    parseInt(d.substr(26, 8), 2);
                if (cks && ((cks & 0xFF) === parseInt(d.substr(34, 8), 2))) {
                    callback({
                        rh: parseInt(d.substr(2, 8), 2) + (p.opt.hOffset || 0),
                        temp: parseInt(d.substr(18, 8), 2) + (p.opt.tOffset || 0)
                    }, 'dht11');
                }
                //else {
                //console.log('Invalid DHT11 reading');
                // callback({
                //     err: true,
                //     checksumError: cks > 0
                // }, 'dht11');
                //}
            }, 50);
        }, (p.opt.interval || 600000));
    }
};

Dht11Source.prototype.stop = function () {
    if (this.iid) {
        clearInterval(this.iid);
        delete this.iid;
    }
};

exports.createSource = function (opt, wtc) {
    return new Dht11Source(opt, wtc);
};