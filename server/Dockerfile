# code adapted from https://betterstack.com/community/guides/scaling-nodejs/dockerize-nodejs/

FROM node:slim

WORKDIR /usr/src/app

ENV SERVER_URL='mongodb://host.docker.internal:27017/'
ENV DATABASE='CS554-FinalProject-DSATalk'
ENV REDIS_HOST="my-redis-service" 
ENV REDIS_PORT="6379"
ENV TYPE="service_account"
ENV PROJECT_ID=""
ENV PRIVATE_KEY_ID=""
ENV PRIVATE_KEY=""
ENV CLIENT_EMAIL=""
ENV CLIENT_ID=""
ENV AUTH_URI=""
ENV TOKEN_URI=""
ENV AUTH_PROVIDER_X509_CERT_URL=""
ENV CLIENT_X509_CERT_URL=""
ENV UNIVERSE_DOMAIN=""
ENV ACCESS_KEY=""
ENV SECRET_ACCESS_KEY=""
ENV AWS_BUCKET_NAME=""
ENV AWS_REGION="us-east-1"


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]