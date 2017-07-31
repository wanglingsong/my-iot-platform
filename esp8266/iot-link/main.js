// customized code

require('mqttTransport');
require('dht11Source');
require('mqttTarget');

var config = {
	"network": {
		"ssid": "Xiaomi_5576",
		"password": ""
	},
	"transports": {
		"mqtt": {
			"module": "mqttTransport",
			"options": {
				"host": "test",
				"port": 3781
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
		"destination": {
			"module": "MqttTarget",
			"transport": "mqtt",
			"options": {
				"topic": "foo",
				"mqtt": {}
			}
		}
	}]
};

// common code

E.on('init', function() {
	require('init').initEspruino(config);
});