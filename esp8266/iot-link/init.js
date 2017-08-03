function setupTransport(transportsConfig) {
	var transports = {};
	for (var prop in transportsConfig) {
		transports[prop] = require(transportsConfig[prop].module).createTransport(transportsConfig[prop].options);
	}
	return transports;
}

function setupLinks(transports, linksConfig) {
	var W = require('watcher');
	linksConfig.forEach(function(config) {
		var watcher = W.createWatcher();
		createSource(transports, config.source, watcher);
		createTarget(transports, config.target, watcher);
	});
}

function createSource(transports, config, watcher) {
	return require(config.module).createSource(config.options, watcher, transports);
}

function createTarget(transports, config, watcher) {
	return require(config.module).createTarget(config.options, watcher, transports);
}

exports.initEspruino = function(config) {
	var transports = setupTransport(config.transports);
	setupLinks(transports, config.links);
	var wifi = require('Wifi');

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
}