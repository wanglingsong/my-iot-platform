function Dht11Source(options, watcher) {
    this.dht = require('DHT11').connect(options.pin);
    this.interval = options.interval || 600000;
    this.tOffset = options.tOffset || 0;
    this.hOffset = options.hOffset || 0;
    this.intervalId = null;
    watcher.emit('source', this);
    console.log('DHT11 source created');
}

Dht11Source.prototype.startReading = function (callback) {
    if (this.intervalId === null) {
        var p = this;
        p.intervalId = setInterval(function () {
            p.dht.read(function (a) {
                if (!a.err) {
                    callback({
                        temp: a.temp + p.tOffset,
                        rh: a.rh + p.hOffset
                    });
                } else {
                    console.log("Invalid reading: " + JSON.stringify(a));
                }
            });
        }, p.interval);
    }
};

Dht11Source.prototype.stop = function () {
    if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
};

exports.createSource = function (options, watcher) {
    return new Dht11Source(options, watcher);
};