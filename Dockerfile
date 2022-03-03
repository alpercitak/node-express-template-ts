FROM node:14-alpine

WORKDIR /usr/app

COPY ./package*.json .
COPY ./yarn.lock .

RUN yarn install --immutable --immutable-cache --check-cache

EXPOSE ${PORT}
CMD [ "npm", "run", "dev"]