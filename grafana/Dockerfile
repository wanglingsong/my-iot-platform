FROM grafana/grafana

ENV GF_PATHS_PLUGINS=/grafana-plugins

RUN grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install grafana-kairosdb-datasource

EXPOSE 3000