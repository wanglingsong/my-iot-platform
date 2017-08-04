function HCSR501Source(options, watcher) {
    this.pin = options.pin;
    this.watchId = null;
    watcher.emit('source', this);
}

HCSR501Source.prototype.startReading = function (callback) {
    if (this.watchId === null) {
        this.watchId = setWatch(function (e) {
            //console.log("Movement detected: " + e.state + " at " + e.time);
            callback(e.state);
        }, this.pin, {
            repeat: true,
            edge: "both"
        });
    }
};

HCSR501Source.prototype.stop = function () {
    if (this.watchId !== null) {
        clearWatch(this.intervalId);
        this.watchId = null;
    }
};

exports.createSource = function (options, watcher) {
    return new HCSR501Source(options, watcher);
};