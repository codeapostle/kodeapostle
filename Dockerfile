FROM node:14-alpine

RUN npm install gatsby serve -g

COPY package.json blog/package.json

RUN cd blog

RUN yarn install

COPY . .

RUN gatsby build

Expose 4000

CMD serve build -l 4000


