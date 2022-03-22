FROM node:16.0.0-alpine3.13

WORKDIR /app

COPY package*.json ./

#RUN npm install
RUN npm ci --only=production

COPY . .

CMD [ "node", "index" ]