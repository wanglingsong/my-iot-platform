function GpioTarget(options, watcher) {
    this.pin = options.pin;
    watcher.emit('target', this);
    console.log('GPIO target created');
}

GpioTarget.prototype.write = function (data) {
    // TODO parse
    digitalWrite(this.pin, data === 'true');
};

GpioTarget.prototype.stop = function () {};

exports.createTarget = function (options, watcher) {
    return new GpioTarget(options, watcher);
};