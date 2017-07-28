require('mqttTransport');
require('dht11Source');
require('MqttTarget');

var config = {
	"network": {
		"ssid": "Xiaomi_5576",
		"password": ""
	},
	"transports": {
		"mqtt": {
			"module": "mqttTransport",
			"options": {
				"host": "test",
				"port": 3781
			}
		}
	},
	"links": [{
		"source": {
			"module": "dht11Source",
			"options": {
				"pin": 5
			}
		},
		"destination": {
			"module": "MqttTarget",
			"transport": "mqtt",
			"options": {
				"topic": "foo",
				"mqtt": {}
			}
		}
	}]
};

function setupTransport(transportsConfig) {
	let transports = {};
	for (var prop in transportsConfig) {
		transports[prop] = require(transportsConfig[prop].module).createTransport(transportsConfig[prop].options);
	}
	return transports;
}

function setupLinks(transports, linksConfig) {
	var source, destination, W = require('watcher');
	linksConfig.forEach(function(config) {
		let watcher = W.createWatcher();
		source = createSource(transports, config.source, watcher);
		destination = createTarget(transports, config.destination, watcher);
	});
}

function createSource(transports, config, watcher) {
	return require(config.module).createSource(config.options, watcher, (config.transport ? transports[config.transport] : null));
}

function createTarget(transports, config, watcher) {
	return require(config.module).createTarget(config.options, watcher, (config.transport ? transports[config.transport] : null));
}

E.on('init', function() {

	let transports = setupTransport(config.transports);
	setupLinks(transports, config.links);
	let wifi = require('Wifi');

	wifi.on('connected', function(details) {
		console.log("connected: detail=", details);
		for (var prop in transports) {
			transports[prop].connect(true);
		}
	});

	wifi.connect(config.network.ssid, {
		password: config.network.password
	}, function(err) {
		console.log("connected? err=", err, "info=", wifi.getIP());
	});

});