FROM node:22-alpine3.20

# Set environment variables to ensure compatibility
ENV NODE_ENV=production

# Create an app directory
WORKDIR /app

# Copy dependency declarations
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --production && npm cache clean --force

# Copy environment file
COPY .env /app/.env

# Display environment file for debugging (optional)
RUN cat /app/.env

# Copy the rest of the application files
COPY . .

# Expose necessary ports
# EXPOSE 3000
# EXPOSE 5432
# EXPOSE 5433

# Build the app
RUN npm run build

# Add an explicit entrypoint to avoid potential issues
ENTRYPOINT ["node"]

# Default command to start the app
CMD ["dist/index.js"]
