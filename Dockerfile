FROM node:16.10-alpine

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn

COPY . .
RUN yarn build

ENTRYPOINT [ "node", "./build/index.js" ]
