# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект внутрь контейнера
COPY . .

# Запускаем Gulp
RUN npx gulp

# Указываем папку, которую нужно отдать как сайт
# (в Dokploy ты задашь её как publish directory: /app/app)
CMD ["sh", "-c", "while true; do sleep 1000; done"]
