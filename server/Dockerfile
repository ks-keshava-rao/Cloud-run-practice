# Use a Node base image
FROM node:18-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install 

# Copy the rest of the project
COPY . .

# Build the TypeScript project
RUN pnpm build

# Expose port
EXPOSE 3000

# Run the app using the built JS
CMD ["pnpm", "start"]
