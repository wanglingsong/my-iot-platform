function GpioSource(opt, wtc) {
    this.pin = opt.pin;
    this.wid = null;
    wtc.emit('source', this);
    console.log('HCSR501 source created');
}

GpioSource.prototype.read = function (callback) {
    if (this.wid === null) {
        this.wid = setWatch(function (e) {
            console.log("Movement detected: " + e.state + " at " + e.time);
            callback(e, 'gpio');
        }, this.pin, {
            repeat: true,
            edge: "both"
        });
        console.log('Start watching');
    }
};

GpioSource.prototype.stop = function () {
    if (this.wid !== null) {
        console.log('stop watching');
        clearWatch(this.wid);
        this.wid = null;
    }
};

exports.createSource = function (opt, wtc) {
    return new GpioSource(opt, wtc);
};