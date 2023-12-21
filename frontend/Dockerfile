# code adpated from https://stackoverflow.com/questions/73623891/vite-react-docker

FROM node:slim


WORKDIR /frontend


COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "serve"]