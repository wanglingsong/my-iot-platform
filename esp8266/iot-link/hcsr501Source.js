export class HCSR501Source {

	constructor(pin) {
		this.dht = require('DHT11').connect(pin);
		this.watchId = null;
	}

	startReading(callback) {
		if (this.watchId === null) {
			this.watchId = setWatch(function (e) {
				//console.log("Movement detected: " + e.state + " at " + e.time);
				callback(e.state);
			}, pin, {
				repeat: true,
				edge: "both"
			});
		}
	}

	stopReading() {
		if (this.watchId !== null) {
			clearWatch(this.intervalId);
			this.watchId = null;
		}
	}

}