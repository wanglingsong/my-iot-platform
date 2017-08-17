// customized code

require('tinyMqttTransport');
require('dht11Source');
require('hcsr501Source');
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
                "host": "mqtt.thingspeak.com",
                "port": 1883,
                "dedicatedClient": false,
                "auto_reconnect": true
            }
        }
    },
    "links": [{
        "source": {
            "module": "dht11Source",
            "options": {
                "pin": 4,
                "interval": 60000
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
                "transport": "mqtt",
                "transportOptions": null
            }
        },
        "target": {
            "module": "gpioTarget",
            "options": {
                "pin": 12
            }
        }
    }, {
        "source": {
            "module": "hcsr501Source",
            "options": {
                "pin": 5
            }
        },
        "target": {
            "module": "mqttTarget",
            "options": {
                "topic": "hcsr501",
                "transport": "mqtt",
                "transportOptions": null
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