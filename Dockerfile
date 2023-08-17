FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /usr/app

COPY ./package*.json .
COPY ./pnpm-lock.yaml .

RUN pnpm i

COPY . .

RUN pnpm build
RUN pnpm prune --prod

EXPOSE ${PORT}
CMD [ "node", "dist/app.js" ]