import config from './linkConfig.json';
import {
	MqttTransport
} from './mqttTransport.js';
import {
	Dht11Source
} from './dht11Source.js';
import {
	MqttTarget
} from './mqttTarget.js';
import {
	Link
} from './link.js';

const classes = {
	Dht11Source,
	MqttTarget,
	MqttTransport
};

function setupTransport(transportsConfig) {
	let transports = {};
	for (var prop in transportsConfig) {
		transports[prop] = new classes[transportsConfig[prop].class](transportsConfig[prop].options);
	}
	return transports;
}

function setupLinks(transports, linksConfig) {
	var source, target, formatter;
	linksConfig.forEach(function (config) {
		source = createEndpoint(transports, config.source);
		target = createEndpoint(transports, config.target);
		formatter = createFormatter(config.formatter);
		new Link(source, target, formatter);
	});
}

function createEndpoint(transports, config) {
	return new classes[config.class](transports[config.transport], config.options);
}

function createFormatter(formatterConfig) {
	return null;
}

E.on('init', function () {

	let transports = setupTransport(config.transports);
	setupLinks(transports, config.links);
	let wifi = require('Wifi');

	wifi.on('connected', function (details) {
		console.log("connected: detail=", details);
		for (var prop in transports) {
			transports[prop].connect(true);
		}
	});

	wifi.connect(config.network.ssid, {
		password: config.network.password
	}, function (err) {
		console.log("connected? err=", err, "info=", wifi.getIP());
	});

});