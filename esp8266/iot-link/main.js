// customized code

require('tinyMqttTransport');
require('dht11Source');
require('mqttTarget');

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
				"pin": 5
			}
		},
		"target": {
			"module": "mqttTarget",
			"options": {
				"topic": "foo",
				"transport": "mqtt",
				"transportOptions": null
			}
		}
	}]
};

// common code

E.setFlags({pretokenise:1});

E.on('init', function() {
	require('init').initEspruino(config);
});