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

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default site
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
