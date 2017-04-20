package org.myiot.kairos.plugin.beanstalk;

import java.util.Map;

/**
 * Created by Wang on 2017/4/15.
 */
public class Metric {

    private String metricName;

    private Map<String, String> tags;

    private long[] timestamp;

    private double[] doubles;

    private long[] longs;

    private String[] strings;

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

    public double[] getDoubles() {
        return doubles;
    }

    public void setDoubles(double[] doubles) {
        this.doubles = doubles;
    }

    public long[] getLongs() {
        return longs;
    }

    public void setLongs(long[] longs) {
        this.longs = longs;
    }

    public String[] getStrings() {
        return strings;
    }

    public void setStrings(String[] strings) {
        this.strings = strings;
    }

}
