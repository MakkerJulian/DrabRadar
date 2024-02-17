FROM node:14.15.4-alpine3.12

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
