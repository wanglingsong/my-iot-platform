FROM t0mmyt/kairosdb:v1.1.3

ADD ./kairos-beanstalk/target/*with-dependencies.jar /opt/kairosdb/lib
ADD ./kairos-beanstalk/kairos-beanstalk.properties /opt/kairosdb/conf

EXPOSE 8080