# Dockerfile for HuertoHogar React app
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
# Production stage (serve static files)
FROM nginx:stable-alpine
COPY --from=build /app/huertohogar-app/dist /usr/share/nginx/html
# Expose default HTTP port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;" ]
