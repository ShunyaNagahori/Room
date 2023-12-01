FROM node:18-slim

WORKDIR /server

COPY ./package*.json ./
# COPY ./server.js ./

RUN npm install

CMD ["npm", "start"]
