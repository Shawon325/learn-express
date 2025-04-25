FROM node:23-slim

ARG user
ARG uid

RUN apt-get update && \
    apt-get install -y \
    curl \
    openssl \
    libssl-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY package*.json .
COPY prisma/schema.prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 8888

CMD ["npm", "run","start:dev"]
