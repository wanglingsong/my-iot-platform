export function initHCSR501(pin, client, topic) {

    let i = null;

    client.onConnected(function () {
        console.log("mqtt connected, ready to send message to topic: " + topic);
        if (i === null) {
            i = setWatch(function (e) {
                //console.log("Movement detected: " + e.state + " at " + e.time);
                client.publish(topic, e.state);
            }, pin, {
                repeat: true,
                edge: "both"
            });
        }
    });

    client.onDisconnected(function () {
        console.log("mqtt disconnected");
        if (i !== null) {
            clearWatch(i);
            i = null;
        }
    });

};