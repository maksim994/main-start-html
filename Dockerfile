# Этап 1: Сборка
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
COPY gulpfile.js ./

# Устанавливаем зависимости (как локально)
RUN npm install --include=dev

# Копируем исходный код
COPY . .

# Запускаем сборку через npm-скрипт
RUN npm run build

# Этап 2: Финальный образ
FROM nginx:1.25-alpine AS production

COPY --from=builder /app/app /usr/share/nginx/html

# Базовая конфигурация Nginx
RUN echo 'location / {' > /etc/nginx/conf.d/default.conf && \
    echo '  try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

EXPOSE 80
