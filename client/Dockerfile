FROM node:18-slim

WORKDIR /client

COPY ./package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]
