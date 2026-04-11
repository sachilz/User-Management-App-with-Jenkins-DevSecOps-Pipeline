FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (important for caching)
COPY package*.json ./

# Install dependencies in clean + secure way
RUN npm ci

# Copy rest of the app
COPY . .

# (optional) install nodemon only for dev mode
RUN npm install -g nodemon

EXPOSE 5000

CMD ["nodemon", "server.js"]