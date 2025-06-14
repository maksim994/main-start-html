# Этап 1: Сборка
FROM node:18-alpine AS builder

# Установка утилит для сборки
RUN apk add --no-cache bash git

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
COPY gulpfile.js ./

# Устанавливаем зависимости
RUN npm install --include=dev

# Копируем исходный код
COPY . .

# Выполняем production-сборку
RUN npx gulp build --production

# Этап 2: Финальный образ (ИМЯ production ОБЯЗАТЕЛЬНО!)
FROM nginx:1.25-alpine AS production

# Копируем собранные файлы
COPY --from=builder /app/app /usr/share/nginx/html

# Оптимизированная конфигурация Nginx
RUN echo 'location / {' > /etc/nginx/conf.d/default.conf && \
    echo '  try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80
