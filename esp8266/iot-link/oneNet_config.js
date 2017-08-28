var config = {
    "network": {
        "ssid": "TP-LINK_7B4CC6",
        "password": ""
    },
    "transports": {
        "mqtt": {
            "module": "tinyMqttTransport",
            "options": {
                "host": "183.230.40.39",
                "port": 6002,
                "dedicatedClient": false,
                "auto_reconnect": true,
                "client_id": "11426289",
                "username": "87885",
                "password": "mib"
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
            "module": "oneNetMqttTarget",
            "options": {
                "topic": "$dp",
                "transport": "mqtt"
            }
        }
    }, {
        "source": {
            "module": "mqttSource",
            "options": {
                "topic": "dummy",
                "transport": "mqtt"
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
            "module": "gpioSource",
            "options": {
                "pin": 5
            }
        },
        "target": {
            "module": "oneNetMqttTarget",
            "options": {
                "topic": "$dp",
                "transport": "mqtt"
            }
        }
    }]
};