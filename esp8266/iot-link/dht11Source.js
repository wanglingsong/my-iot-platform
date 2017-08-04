function Dht11Source(options, watcher) {
	this.dht = require('DHT11').connect(options.pin);
	this.interval = options.interval || 600000;
	this.temperatureOffset = options.temperatureOffset || 0;
	this.humidityOffset = options.humidityOffset || 0;
	this.intervalId = null;
	watcher.emit('source', this);
	console.log('DHT11 source created');
}

Dht11Source.prototype.startReading = function(callback) {
	if (this.intervalId === null) {
		var p = this;
		p.intervalId = setInterval(function() {
			p.dht.read(function(a) {
				if (!a.err) {
					callback({
						'temp': a.temp + p.temperatureOffset,
						'rh': a.rh + p.humidityOffset
					});
				} else {
					console.log("Invalid reading: " + JSON.stringify(a));
				}
			});
		}, p.interval);
	}
}

Dht11Source.prototype.stop = function() {
	if (this.intervalId !== null) {
		clearInterval(this.intervalId);
		this.intervalId = null;
	}
}

exports.createSource = function(options, watcher, transports) {
	return new Dht11Source(options, watcher);
}