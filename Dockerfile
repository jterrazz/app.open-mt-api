FROM node:16

ARG npm_token

# Installs dependencies and cache it based on these 2 files
COPY ./package.json .
COPY ./yarn.lock .
RUN NPM_TOKEN=$npm_token yarn --ci

# Adds the application
ADD . /app

RUN npx prisma generate
CMD yarn start
