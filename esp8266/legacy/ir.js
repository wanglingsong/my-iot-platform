export function initVs1838b(pin) {
	require("IRReceiver").connect(pin, function (code) {
		console.log(code);
	});
}

export function watchIr(pin, times) {
	setWatch(function (e) {
		// work out how long the pulse was, in milliseconds
		var pulseLen = 1000 * (e.time - e.lastTime);
		// then save it, if it was less than 1 second
		if (pulseLen < 1000)
			times.push(pulseLen);
		else {
			console.log(times);
			times = [];
		}
	}, pin, {
		repeat: true
	});
}

// Espruino on ESP8266 can't generate 38K wave at this moment

export function sendIr(longPin, shortPin, times) {
  // Start the 38kHz square wave
  analogWrite(shortPin,0.9,{freq:38000});
  // Send the pulses
  digitalPulse(longPin, 1, times);
  // Wait until pulsing is finished
  digitalPulse(longPin, 1, 0);
}