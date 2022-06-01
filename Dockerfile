FROM node:16

WORKDIR /app

# Installs dependencies and cache it based on these 2 files
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn --ci

# Adds the application
ADD . /app

RUN npx prisma generate
CMD yarn start