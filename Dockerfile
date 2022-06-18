FROM node:16

ARG npm_token

# Installs dependencies and cache it based on these 2 files
COPY ./package.json .
COPY ./yarn.lock .
COPY ./.npmrc .
RUN NPM_TOKEN=$npm_token yarn --ci

# Adds the application
COPY . .

RUN npx prisma generate
CMD yarn start
