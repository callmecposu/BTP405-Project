FROM node:alpine

WORKDIR /client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD npx next start -p 3010