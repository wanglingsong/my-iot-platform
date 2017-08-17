function BH1750Source(opt, wtc) {
    var i2c = new I2C();
    i2c.setup({
        scl: opt.scl,
        sda: opt.sda
    });
    this.bh = require("BH1750").connect(i2c, opt.address);
    this.itvl = opt.interval || 600000;
    this.iid = null;
    wtc.emit('source', this);
    console.log('BH1750 source created');
}

BH1750Source.prototype.read = function (callback) {
    if (this.iid === null) {
        var p = this;
        p.bh.start(1, 0);
        p.iid = setInterval(function () {
            callback({
                lux: p.bh.read()
            });
        }, p.itvl);
    }
};

BH1750Source.prototype.stop = function () {
    if (this.iid !== null) {
        clearInterval(this.iid);
        this.iid = null;
    }
};

exports.createSource = function (opt, wtc) {
    return new BH1750Source(opt, wtc);
};