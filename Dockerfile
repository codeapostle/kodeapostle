FROM node:12

RUN npm install serve -g

COPY . .

RUN yarn install

RUN npm run build

Expose 4000

CMD serve public -l 4000


