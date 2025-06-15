# Этап 1: Сборка с Node.js
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
COPY gulpfile.js ./

# Устанавливаем зависимости (без глобальной установки)
RUN npm install --include=dev

# Копируем исходный код
COPY . .

# Запускаем сборку через npm-скрипт
RUN npm run build

# Этап 2: Финальный образ с Nginx
FROM nginx:1.25-alpine AS production

COPY --from=builder /app/app /usr/share/nginx/html

# Упрощенная конфигурация Nginx
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
