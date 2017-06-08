import {
	initDht11
} from './dht11.js';
import {
	initHCSR501
} from './hcsr501.js';
import {
	startWifi
} from './network.js';
import {
	createCilent
} from './commonMqttClient.js';
import config from './config.json';

const DEVICE_ID = "esp8266_" + getSerial();

E.on('init', function () {

	let client = createCilent(config.mqtt, {
		client_id: DEVICE_ID
	});

	initDht11(D5, client, DEVICE_ID + "_dht11");
	initHCSR501(D12, client, DEVICE_ID + "_hcsr501");

	startWifi(client, config.wifi.ssid, config.wifi.password);

	setDeepSleep(1);

});