# Этап 1: Сборка проекта
FROM node:18 AS builder

WORKDIR /app

# 1. Копируем только файлы, необходимые для установки зависимостей
COPY package*.json ./
COPY gulpfile.js ./

# 2. Установка зависимостей (включая gulp)
RUN npm install --include=dev

# 3. Копируем ВСЕ исходные файлы
COPY . .

# 4. Выполняем production-сборку
RUN npm run build

# Этап 2: Финальный образ с Nginx
FROM nginx:1.25-alpine

# 1. Копируем собранные файлы из папки app
COPY --from=builder /app/app /usr/share/nginx/html

# 2. Конфигурация для мультистраничности и SPA
RUN echo 'index index.html;' > /etc/nginx/conf.d/default.conf && \
    echo 'error_page 404 /404.html;' >> /etc/nginx/conf.d/default.conf && \
    echo 'location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '  try_files $uri $uri.html $uri/ =404;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# 3. Оптимизация Nginx
RUN echo 'gzip on;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;' >> /etc/nginx/conf.d/compression.conf

# 4. Права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Добавьте эту строку в самый конец файла
WORKDIR /usr/share/nginx/html
