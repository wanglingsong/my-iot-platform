package org.myiot.kairos.plugin.beanstalk;

import com.alibaba.fastjson.JSON;
import com.dinstone.beanstalkc.Job;
import com.dinstone.beanstalkc.JobConsumer;
import com.google.common.collect.ImmutableSortedMap;
import org.kairosdb.core.DataPoint;
import org.kairosdb.core.datapoints.DoubleDataPointFactoryImpl;
import org.kairosdb.core.datastore.Datastore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by Wang on 2017/4/15.
 */
public class ConsumerThread implements Runnable {

    private static final Logger logger = LoggerFactory.getLogger(ConsumerThread.class);

    private Datastore datastore;

    private JobConsumer consumer;

    public ConsumerThread(Datastore datastore, JobConsumer consumer) {
        this.datastore = datastore;
        this.consumer = consumer;
    }

    public void run() {
        DoubleDataPointFactoryImpl dataPointFactory = new DoubleDataPointFactoryImpl();
        try {
            while (!Thread.interrupted()) {
                try {
                    Job job = consumer.reserveJob(1000);
                    if (job != null) {
                        QueueMessage message = JSON.parseObject(job.getData(), QueueMessage.class);
                        ImmutableSortedMap<String, String> tags = ImmutableSortedMap.copyOf(message.getTags());
                        for (int i = 0; i < message.getTimestamp().length; i++) {
                            DataPoint point = dataPointFactory.createDataPoint(message.getTimestamp()[i], message.getDoubleData()[i]);
                            datastore.putDataPoint(message.getMetricName(), tags, point, 0);
                        }
                        consumer.deleteJob(job.getId());
                    }
                } catch (Exception e) {
                    logger.error("Failed to consume job", e);
                }
            }
        } finally {
            consumer.close();
        }
    }

}
