function Dht11Source(opt, wtc) {
    this.dht = require('DHT11').connect(opt.pin);
    this.itvl = opt.interval || 600000;
    this.tofs = opt.tOffset || 0;
    this.hofs = opt.hOffset || 0;
    this.iid = null;
    wtc.emit('source', this);
    console.log('DHT11 source created with option: ' + JSON.stringify(opt));
}

Dht11Source.prototype.read = function (callback) {
    if (this.iid === null) {
        var p = this;
        p.iid = setInterval(function () {
            p.dht.read(function (a) {
                console.log("Reading: " + JSON.stringify(a));
                if (!a.err) {
                    callback('{"temp":' + (a.temp + p.tofs) + ',"rh":' + (a.rh + p.hofs) + '}');
                } else {
                    console.log("Invalid reading: " + JSON.stringify(a));
                };
            });
        }, p.itvl);
    }
};

Dht11Source.prototype.stop = function () {
    if (this.iid !== null) {
        clearInterval(this.iid);
        this.iid = null;
    }
};

exports.createSource = function (opt, wtc) {
    return new Dht11Source(opt, wtc);
};