# How to build your own iot platform
## Architecture
![Image of architecture](https://github.com/wanglingsong/my-iot-platform/blob/master/iot%20platform%20architecture.png)
## A solution of simple monitoring platform:
* Http Server: NodeJS
* Message Queue: Beanstalk
* Timeseries Database: KairosDB + ScyllaDB
* Dashboard: Grafana
## Metric Message
```javascript
{
        metricName: "CO",
        tags: {
            sensorId: "sensor1",
            organization: "UCI"
        },
        timestamp: [1492759269000, 1492759270000, 1492759271000],
        doubles: [1, 2, 3]
    }
```
## Demo
![demo](https://github.com/wanglingsong/my-iot-platform/blob/master/snapshot.PNG)
