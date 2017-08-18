function HCSR501Source(opt, wtc) {
    this.pin = opt.pin;
    this.wid = null;
    wtc.emit('source', this);
    console.log('HCSR501 source created');
}

HCSR501Source.prototype.read = function (callback) {
    if (this.wid === null) {
        this.wid = setWatch(function (e) {
            console.log("Movement detected: " + e.state + " at " + e.time);
            callback(e, 'hcsr501');
        }, this.pin, {
            repeat: true,
            edge: "both"
        });
        console.log('Start watching');
    }
};

HCSR501Source.prototype.stop = function () {
    if (this.wid !== null) {
        console.log('stop watching');
        clearWatch(this.wid);
        this.wid = null;
    }
};

exports.createSource = function (opt, wtc) {
    return new HCSR501Source(opt, wtc);
};