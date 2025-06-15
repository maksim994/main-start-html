#FROM node:18-alpine
FROM --platform=linux/amd64 node:18-alpine

# Обновим и установим нужные утилиты
RUN apk add --no-cache bash git

# Создаём рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Остальной код будет монтироваться, копировать не нужно
EXPOSE 3000

CMD ["npx", "gulp"]
