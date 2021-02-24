FROM node:12-alpine

RUN apk --update --no-cache \
		add  \
                automake \
		git \
		alpine-sdk  \
		nasm  \
		autoconf  \
		build-base \
		zlib \
		zlib-dev \
		libpng \
		libpng-dev\
		libwebp \
		libwebp-dev \
		libjpeg-turbo \
		libjpeg-turbo-dev

RUN npm install serve -g

COPY . .

RUN yarn install

RUN npm run build

Expose 4000

CMD serve build -l 4000


