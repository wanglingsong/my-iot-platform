// customized code

require('mqttTransport');
require('dht11Source');
require('mqttTarget');

var config = {
	"network": {
		"ssid": "TP-LINK_7B4CC6",
		"password": ""
	},
	"transports": {
		"mqtt": {
			"module": "mqttTransport",
			"options": {
				"host": "localhost",
				"port": 1883
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
		"target": {
			"module": "mqttTarget",
			"options": {
				"topic": "foo",
				"transport": "mqtt",
				"transportOptions": {}
			}
		}
	}]
};

// common code

E.setFlags({pretokenise:1});

E.on('init', function() {
	require('init').initEspruino(config);
});