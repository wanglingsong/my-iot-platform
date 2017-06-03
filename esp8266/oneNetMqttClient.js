import {
	createMqttClient
} from './commonMqttClient.js';

class OneNetMqttClient {

	constructor(mqtt) {
		this.mqtt = mqtt;
	}

	connect() {
		this.mqtt.connect();
	}

	submit(data) {}

	publish(topic, data) {
		let length = data.length;
		let buffer = new ArrayBuffer(3);
		let dataView = new DataView(buffer);
		dataView.setUint8(0, 3); // type 3
		dataView.setUint16(1, length);
		let header = String.fromCharCode.apply(null, new Uint8Array(buffer));
		this.mqtt.publish(topic, header + data);
	}

	subscribe(topic, callback) {
		this.mqtt.subscribe(topic, callback);
	}

	onConnected(callback) {
		this.mqtt.on("connected", callback);
	}

	onDisconnected(callback) {
		this.mqtt.on("disconnected", callback);
	}

}

export function createCilent(mqttConfig, mqttOpt) {
	return new OneNetMqttClient(createMqttClient(mqttConfig.host, mqttConfig.port, mqttConfig.autoReconnect, mqttOpt));
}