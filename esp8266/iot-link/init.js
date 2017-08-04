function setupTransport(transportsConfig) {
    var transports = {};
    Object.keys(transportsConfig).forEach(function (k) {
        transports[k] = require(transportsConfig[k].module).createTransport(transportsConfig[k].options);
    });
    return transports;
}

function setupLinks(transports, linksConfig) {

    function link(w) {
        console.log('linked');
        w.s.startReading(function (data) {
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

    linksConfig.forEach(function (config) {
        var w = {
            r: false
        };

        w.on('source', function (s) {
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

        w.on('target', function (t) {
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

        function createSource(transports, config, watcher) {
            require(config.module).createSource(config.options, watcher, transports);
        }

        function createTarget(transports, config, watcher) {
            require(config.module).createTarget(config.options, watcher, transports);
        }

        createSource(transports, config.source, w);
        createTarget(transports, config.target, w);
    });

}

exports.initEspruino = function (config) {
    var transports = setupTransport(config.transports);
    setupLinks(transports, config.links);
    var wifi = require('Wifi');

    wifi.on('connected', function (details) {
        console.log("connected: detail=", details);
        Object.keys(transports).forEach(function (k) {
            transports[k].connect(true);
        });
    });

    wifi.connect(config.network.ssid, {
        password: config.network.password
    }, function (err) {
        console.log("connected? err=", err, "info=", wifi.getIP());
    });
};