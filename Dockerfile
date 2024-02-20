FROM node:21.6.2

WORKDIR /app/

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm ci
