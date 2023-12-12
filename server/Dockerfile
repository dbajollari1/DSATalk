FROM node:slim

# Create app directory
WORKDIR /usr/src/app



ENV SERVER_URL='mongodb://host.docker.internal:27017/'
ENV DATABASE='CS554-FinalProject-DSATalk'
ENV LOCAL_IP = "192.168.1.155"
ENV REDIS_HOST: "host.docker.internal" 
ENV REDIS_PORT: "6379"
#"127.0.0.1"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]