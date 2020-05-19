FROM node:12-alpine as root-deps
WORKDIR /root
COPY . ./
RUN yarn --pure-lockfile
RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O /root/cloud_sql_proxy
RUN chmod +x /root/cloud_sql_proxy
COPY run.sh /root/run.sh
RUN chmod +x /root/run.sh
COPY credentials.json /root/credentials.json
RUN apk --no-cache add ca-certificates
EXPOSE 4000
CMD ["./run.sh"]
