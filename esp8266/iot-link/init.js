function setupTransport(transportsConfig) {
	var transports = {};
	for (var prop in transportsConfig) {
		transports[prop] = require(transportsConfig[prop].module).createTransport(transportsConfig[prop].options);
	}
	return transports;
}

function setupLinks(transports, linksConfig) {

	function link(w) {
		console.log('linked');
		w.s.startReading(function(data) {
			w.t.write(data);
		});
	}

	function delink(w) {
		if (w.s) {
			w.s.stop();
		}
		if (w.t) {
			w.t.stop();
		}
	}

	linksConfig.forEach(function(config) {
		var w = {
			'r': false
		};

		w.on('source', function(s) {
			w.s = s;
			if (w.s && w.t && !w.r) {
				w.r = true;
				link(w);
			}
			if (!w.s && w.r) {
				w.r = false;
				delink(w);
			}
		});

		w.on('target', function(t) {
			w.t = t;
			if (w.s && w.t && !w.r) {
				w.r = true;
				link(w);
			}
			if (!w.t && w.r) {
				w.r = false;
				delink(w);
			}
		});

		createSource(transports, config.source, w);
		createTarget(transports, config.target, w);
	});
}

function createSource(transports, config, watcher) {
	require(config.module).createSource(config.options, watcher, transports);
}

function createTarget(transports, config, watcher) {
	require(config.module).createTarget(config.options, watcher, transports);
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