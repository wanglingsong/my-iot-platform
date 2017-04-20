FROM grafana/grafana:4.2.0

ENV GF_PATHS_PLUGINS=/grafana-plugins

RUN grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install grafana-kairosdb-datasource

EXPOSE 3000