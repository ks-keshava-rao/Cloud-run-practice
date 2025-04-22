# Stage 1: Build with PNPM
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy project files
COPY . .

# Install dependencies and build
RUN pnpm install --force
RUN pnpm run build

# Stage 2: Serve with "serve"
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=builder /app/dist /app/dist

EXPOSE 8080

# Use serve to serve the static files on port 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
