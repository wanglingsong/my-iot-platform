// customized code

require('nativeMqttTransport');
require('dht11Source');
require('gpioSource');
require('gpioTarget');
require('cayenneMqttSource');
require('cayenneMqttTarget');

var config = {
    network: {
        ssid: "Xiaomi_5576",
        password: ""
    },
    transports: {
        mqtt: {
            module: "nativeMqttTransport",
            options: {
                host: "mqtt.mydevices.com",
                port: 1883,
                auto_reconnect: true,
                client_id: "14aba520-8313-11e7-b153-197ebdab87be",
                username: "4b0e1400-825e-11e7-a491-d751ec027e48",
                password: "bae4238cd87912606ed180bafc09523a648fcd33"
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
            module: "cayenneMqttTarget",
            options: {
                topic: "v1/4b0e1400-825e-11e7-a491-d751ec027e48/things/14aba520-8313-11e7-b153-197ebdab87be/data",
                transport: "mqtt"
            }
        }
    }, {
        source: {
            module: "cayenneMqttSource",
            options: {
                topic: "v1/4b0e1400-825e-11e7-a491-d751ec027e48/things/14aba520-8313-11e7-b153-197ebdab87be/cmd/switch",
                reply: "v1/4b0e1400-825e-11e7-a491-d751ec027e48/things/14aba520-8313-11e7-b153-197ebdab87be/response",
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
            module: "cayenneMqttTarget",
            options: {
                topic: "v1/4b0e1400-825e-11e7-a491-d751ec027e48/things/14aba520-8313-11e7-b153-197ebdab87be/data",
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