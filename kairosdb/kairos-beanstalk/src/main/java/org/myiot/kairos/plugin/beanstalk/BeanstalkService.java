package org.myiot.kairos.plugin.beanstalk;

import com.dinstone.beanstalkc.BeanstalkClientFactory;
import com.dinstone.beanstalkc.Configuration;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import org.kairosdb.core.KairosDBService;
import org.kairosdb.core.datastore.Datastore;
import org.kairosdb.core.exception.KairosDBException;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by Wang on 2017/4/16.
 */
public class BeanstalkService implements KairosDBService {

    private Datastore datastore;
    private String host;
    private int port;
    private String tube;
    private ExecutorService executor;
    private int threads;

    @Inject
    public BeanstalkService(Datastore datastore,
                            @Named("kairosdb.beanstalk.host") String host,
                            @Named("kairosdb.beanstalk.port") int port,
                            @Named("kairosdb.beanstalk.tube") String tube,
                            @Named("kairosdb.beanstalk.consumer_threads") int threads) {
        this.datastore = datastore;
        this.host = host;
        this.port = port;
        this.tube = tube;
        this.threads = threads;
        this.executor = Executors.newFixedThreadPool(threads);
    }

    @Override
    public void start() throws KairosDBException {
        Configuration config = new Configuration();
        config.setServiceHost(host);
        config.setServicePort(port);
        BeanstalkClientFactory factory = new BeanstalkClientFactory(config);
        for (int i = 0; i < this.threads; i++) {
            executor.submit(new ConsumerThread(datastore, factory.createJobConsumer(tube)));
        }
    }

    @Override
    public void stop() {
        executor.shutdown();
    }

}
