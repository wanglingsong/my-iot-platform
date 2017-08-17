function GpioTarget(opt, wtc) {
	this.pin = opt.pin;
	wtc.emit('target', this);
	console.log('GPIO target created');
}

GpioTarget.prototype.write = function (data) {
	// TODO parse
	digitalWrite(this.pin, data === 'true');
};

GpioTarget.prototype.stop = function () {};

exports.createTarget = function (opt, wtc) {
	return new GpioTarget(opt, wtc);
};