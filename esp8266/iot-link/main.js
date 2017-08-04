// customized code

require('tinyMqttTransport');
require('dht11Source');
require('bh1750Source');
require('mqttSource');
require('mqttTarget');
require('gpioTarget');

var config = {
    "network": {
        "ssid": "TP-LINK_7B4CC6",
        "password": ""
    },
    "transports": {
        "mqtt": {
            "module": "tinyMqttTransport",
            "options": {
                "host": "iot.eclipse.org",
                "port": 1883
            }
        }
    },
    "links": [{
        "source": {
            "module": "dht11Source",
            "options": {
                "pin": 7
            }
        },
        "target": {
            "module": "mqttTarget",
            "options": {
                "topic": "dht11",
                "transport": "mqtt",
                "transportOptions": null
            }
        }
    }, {
        "source": {
            "module": "mqttSource",
            "options": {
                "topic": "switch",
                "transport": "mqtt"
            }
        },
        "target": {
            "module": "gpioTarget",
            "options": {
                "pin": 6
            }
        }
    }, {
        "source": {
            "module": "bh1750Source",
            "options": {
                "scl": 4,
                "sda": 5,
                "address": true
            }
        },
        "target": {
            "module": "mqttTarget",
            "options": {
                "topic": "bh1750",
                "transport": "mqtt",
            }
        }
    }]
};

// common code

E.setFlags({
    pretokenise: 1
});

E.on('init', function () {
    require('init').initEspruino(config);
});