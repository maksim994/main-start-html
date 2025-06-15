FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY gulpfile.js ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine AS production

# Копируем файлы и проверяем
COPY --from=builder /app/app /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html

# Права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Полная конфигурация Nginx
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    error_log /var/log/nginx/error.log;' >> /etc/nginx/conf.d/default.conf && \
    echo '    access_log /var/log/nginx/access.log;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

EXPOSE 80
