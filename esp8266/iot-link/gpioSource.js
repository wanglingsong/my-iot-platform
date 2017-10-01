function GpioSource(opt, wtc) {
    this.pin = opt.pin;
    wtc.emit('source', this);
    //console.log('GPIO source created');
}

GpioSource.prototype.read = function (callback) {
    if (!this.wid) {
        this.wid = setWatch(function (e) {
            //console.log("Movement detected: " + e.state + " at " + e.time);
            callback(e, 'gpio');
        }, this.pin, {
            repeat: true,
            edge: "both"
        });
        //console.log('Start watching');
    }
};

GpioSource.prototype.stop = function () {
    if (this.wid) {
        //console.log('stop watching');
        clearWatch(this.wid);
        delete this.wid;
    }
};

exports.createSource = function (opt, wtc) {
    return new GpioSource(opt, wtc);
};