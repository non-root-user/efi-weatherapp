FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm i

EXPOSE 9000
CMD ["npm", "run", "start"]
