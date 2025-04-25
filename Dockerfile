FROM node:23-slim

# Install ALL dependencies
RUN apt-get update && \
    apt-get install -y \
    curl \
    openssl \
    libssl-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copy package files
COPY package*.json .
COPY prisma/schema.prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy app files
COPY . .

EXPOSE 8888

CMD ["npm", "run", "start:dev"]
