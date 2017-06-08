let DHT11 = require('DHT11');

export class Dht11Source {

	constructor(transport, options) {
		this.dht = DHT11.connect(options.pin);
		this.interval = options.interval || 600000;
		this.temperatureOffset = options.temperatureOffset || 0;
		this.humidityOffset = options.humidityOffset || 0;
		this.intervalId = null;
	}

	onConnected(callback) {
		// always connected
		callback();
	}

	onDisconnected(callback) {}

	startReading(callback) {
		if (this.intervalId === null) {
			let p = this;
			this.intervalId = setInterval(function () {
				p.dht.read(function (a) {
					if (!a.err) {
						callback({
							'temp': a.temp + p.temperatureOffset,
							'rh': a.rh + p.humidityOffset
						});
					} else {
						console.log("Invalid reading: " + JSON.stringify(a));
					}
				});
			}, this.interval);
		}
	}

	stopReading() {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

}