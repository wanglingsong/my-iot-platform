import {
	initDht11
} from './dht11.js';
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

	// let client = createCilent({
	// 	client_id: '6693093',
	// 	host: '183.230.40.39',
	// 	port: 6002,
	// 	username: '87885',
	// 	password: 'bedroom1'
	// });
	// initDht11(D5, client, "$dp");

	startWifi(client, config.wifi.ssid, config.wifi.password);

	setDeepSleep(1);

});