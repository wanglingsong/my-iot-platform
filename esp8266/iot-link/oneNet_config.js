// customized code

require('nativeMqttTransport');
require('dht11Source');
require('gpioSource');
require('gpioTarget');
require('mqttSource');
require('oneNetMqttTarget');

var config = {
    network: {
        ssid: "Xiaomi_5576",
        password: ""
    },
    transports: {
        mqtt: {
            module: "nativeMqttTransport",
            options: {
                host: "183.230.40.39",
                port: 6002,
                auto_reconnect: true,
                client_id: "11426289",
                username: "87885",
                password: "mib"
            }
        }
    },
    links: [{
        source: {
            module: "dht11Source",
            options: {
                pin: 4,
                interval: 10000
            }
        },
        target: {
            module: "oneNetMqttTarget",
            options: {
                topic: "$dp",
                transport: "mqtt"
            }
        }
    }, {
        source: {
            module: "mqttSource",
            options: {
                topic: "/11426289/switch",
                transport: "mqtt"
            }
        },
        target: {
            module: "gpioTarget",
            options: {
                pin: 12
            }
        }
    }, {
        source: {
            module: "gpioSource",
            options: {
                pin: 5
            }
        },
        target: {
            module: "oneNetMqttTarget",
            options: {
                topic: "$dp",
                transport: "mqtt"
            }
        }
    }]
};
// common code

E.setFlags({
    pretokenise: 1
});

var watchers = null;

E.on('init', function () {
    watchers = require('init').initEspruino(config);
});