FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm i

EXPOSE 8000
ENV NODE_OPTIONS --openssl-legacy-provider
CMD ["npm", "run", "start"]
