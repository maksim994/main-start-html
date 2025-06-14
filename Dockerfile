# Этап 1: Сборка
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY gulpfile.js ./

RUN npm install --include=dev

COPY . .

# Добавляем флаг --silent для игнорирования предупреждений
RUN npm run build --silent

# Этап 2: Финальный образ
FROM nginx:1.25-alpine AS production

COPY --from=builder /app/app /usr/share/nginx/html

# Упрощенная конфигурация Nginx
RUN echo 'location / { try_files $uri $uri/ /index.html; }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
