package org.myiot.kairos.plugin.beanstalk;

import com.google.inject.AbstractModule;
import com.google.inject.Singleton;

/**
 * Created by Wang on 2017/4/15.
 */
public class BeanstalkModule extends AbstractModule {

    protected void configure() {
        bind(BeanstalkService.class).in(Singleton.class);
    }

}
