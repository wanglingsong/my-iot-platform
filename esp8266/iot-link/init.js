function setupTspt(tConfig) {
    var tspt = {};
    Object.keys(tConfig).forEach(function (k) {
        tspt[k] = require(tConfig[k].module).createTransport(tConfig[k].options);
    });
    return tspt;
}

function setupLinks(tspt, lnkConfig) {

    function link(w) {
        w.s.read(function (data, type) {
            w.t.write(data, type);
        });
        console.log('linked');
    }

    function delink(w) {
        if (w.s) {
            w.s.stop();
        }
        if (w.t) {
            w.t.stop();
        }
        console.log('delinked');
    }

    var watchers = [];

    lnkConfig.forEach(function (config) {

        var w = {};

        w.on('source', function (s) {
            console.log('on source ' + s);
            if (s && !w.s && w.t) {
                w.s = s;
                link(w);
            } else if (!s && w.s && w.t) {
                w.s = s;
                delink(w);
            } else {
                w.s = s;
            }
        });

        w.on('target', function (t) {
            console.log('on target ' + t);
            if (t && w.s && !w.t) {
                w.t = t;
                link(w);
            } else if (!t && w.t && w.s) {
                w.t = t;
                delink(w);
            } else {
                w.t = t;
            }
        });

        require(config.source.module).createSource(config.source.options, w, tspt);
        require(config.target.module).createTarget(config.target.options, w, tspt);

        watchers.push(w);

    });

    return watchers;

}

exports.initEspruino = function (config) {
    var tspt = setupTspt(config.transports);
    var watchers = setupLinks(tspt, config.links);
    var wifi = require('Wifi');

    wifi.on('connected', function (details) {
        console.log("connected: detail=", details);
        Object.keys(tspt).forEach(function (k) {
            tspt[k].connect(true);
        });
    });

    wifi.connect(config.network.ssid, {
        password: config.network.password
    }, function (err) {
        console.log("connected? err=", err, "info=", wifi.getIP());
    });

    wifi.stopAP();

    return watchers;
};