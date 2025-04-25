# Stage 1: Build
FROM node:23-slim AS build

ARG user
ARG uid

# Install build dependencies
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

# Stage 2: Production
FROM node:23-slim

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y \
    openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copy only the necessary files from the build stage
COPY --from=build /var/www/html /var/www/html

EXPOSE 8888

CMD ["npm", "run", "start:dev"]
