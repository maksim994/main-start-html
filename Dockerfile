# 1. Используем Node.js
FROM node:20-alpine

# 2. Рабочая директория внутри контейнера
WORKDIR /app

# 3. Копируем зависимости
COPY package*.json ./

# 4. Установка зависимостей
RUN npm install

# 5. Копируем весь проект
COPY . .

# 6. Сборка проекта
RUN npm run build

# 7. Заглушка: контейнер "живёт", пока сайт отдаётся
CMD ["sh", "-c", "while true; do sleep 1000; done"]
