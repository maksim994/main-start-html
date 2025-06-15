# Этап 1: Сборка с Node.js и Gulp
FROM node:18-alpine AS builder

# Установка системных зависимостей
RUN apk add --no-cache bash git

# Установка Gulp глобально
RUN npm install -g gulp gulp-cli

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
COPY gulpfile.js ./

# Устанавливаем зависимости проекта
RUN npm install --include=dev

# Копируем исходный код
COPY . .

# Выполняем сборку
RUN gulp build

# Этап 2: Финальный образ с Nginx
FROM nginx:1.25-alpine

# Копируем собранные файлы
COPY --from=builder /app/app /usr/share/nginx/html

# Базовая конфигурация Nginx
RUN echo 'location / { try_files $uri $uri/ /index.html; }' > /etc/nginx/conf.d/default.conf

# Права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80
