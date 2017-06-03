export function initDht11(pin, client, topic, temperatureOffset = 0, humidityOffset = 0) {

    const READ_INTERVAL = 300000;

    let dht = require('DHT11').connect(pin);

    function readTempAndRh() {
        dht.read(function (a) {
            if (!a.err) {
                client.publish(topic, '{"temp":' + (a.temp + temperatureOffset).toString() + ',"rh":' + (a.rh + humidityOffset).toString() + '}');
            } else {
                console.log("Invalid reading: " + JSON.stringify(a));
            }
        });
    }

    let i = null;

    client.onConnected(function () {
        console.log("mqtt connected, ready to send message to topic: " + topic);
        if (i === null) {
            i = setInterval(readTempAndRh, READ_INTERVAL);
        }
    });

    client.onDisconnected(function () {
        console.log("mqtt disconnected");
        if (i !== null) {
            clearInterval(i);
            i = null;
        }
    });

};