# Используем готовый образ с Gulp и Nginx
FROM techlemur/alpine-nginx-gulp:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем исходный код
COPY . .

# Устанавливаем зависимости
RUN npm install --include=dev

# Выполняем сборку
RUN gulp build

# Копируем собранные файлы в папку Nginx
RUN cp -R app/* /usr/share/nginx/html/

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
