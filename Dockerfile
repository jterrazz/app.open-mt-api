FROM node:16

ARG npm_token

# Step 1: Install dependencies only
COPY ./package.json .
COPY ./yarn.lock .
COPY ./.npmrc .
RUN NPM_TOKEN=$npm_token yarn --ci

# Step 2: Copy application files
COPY . .

# Step 3: Generate prisma client
RUN npx prisma generate
