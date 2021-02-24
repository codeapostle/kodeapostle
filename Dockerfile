FROM node:14-alpine

RUN npm install serve -g

COPY . .

RUN npm install

RUN npm run build

Expose 4000

CMD serve build -l 4000


