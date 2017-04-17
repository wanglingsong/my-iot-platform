package org.myiot.kairos.plugin.beanstalk;

import java.util.Map;

/**
 * Created by Wang on 2017/4/15.
 */
public class QueueMessage {

    private String metricName;

    private Map<String, String> tags;

    private long[] timestamp;

    private double[] doubleData;

    private long[] longData;

    private String[] stringData;

    public String getMetricName() {
        return metricName;
    }

    public void setMetricName(String metricName) {
        this.metricName = metricName;
    }

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }

    public long[] getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long[] timestamp) {
        this.timestamp = timestamp;
    }

    public double[] getDoubleData() {
        return doubleData;
    }

    public void setDoubleData(double[] doubleData) {
        this.doubleData = doubleData;
    }

    public long[] getLongData() {
        return longData;
    }

    public void setLongData(long[] longData) {
        this.longData = longData;
    }

    public String[] getStringData() {
        return stringData;
    }

    public void setStringData(String[] stringData) {
        this.stringData = stringData;
    }

}
