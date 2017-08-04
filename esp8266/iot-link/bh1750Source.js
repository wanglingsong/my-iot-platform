function BH1750Source(options, watcher) {
    var i2c = new I2C();
    i2c.setup({
        scl: options.scl,
        sda: options.sda
    });
    this.bh = require("BH1750").connect(i2c, options.address);
    this.interval = options.interval || 600000;
    this.intervalId = null;
    watcher.emit('source', this);
    console.log('BH1750 source created');
}

BH1750Source.prototype.startReading = function (callback) {
    if (this.intervalId === null) {
        var p = this,
            bh = this.bh;
        bh.start(1, 0);
        p.intervalId = setInterval(function () {
            callback({
                lux: bh.read()
            });
        }, p.interval);
    }
};

BH1750Source.prototype.stop = function () {
    if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
};

exports.createSource = function (options, watcher) {
    return new BH1750Source(options, watcher);
};