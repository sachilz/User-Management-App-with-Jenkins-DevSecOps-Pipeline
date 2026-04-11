FROM node:20-alpine

WORKDIR /app

# Copy both package files (important for lock-based install)
COPY package*.json ./

# Use deterministic install
RUN npm install

# Copy rest of the app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]