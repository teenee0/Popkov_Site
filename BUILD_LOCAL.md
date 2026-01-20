# Инструкция по локальной сборке для shared хостинга

Если сборка на shared хостинге не работает из-за ограничений на создание процессов (`spawn EPERM`), соберите проект локально и загрузите на сервер.

## Шаги для локальной сборки:

1. **Клонируйте репозиторий локально** (если еще не сделали):
   ```bash
   git clone https://github.com/teenee0/Popkov_Site.git
   cd Popkov_Site
   ```

2. **Установите зависимости**:
   ```bash
   npm install
   ```

3. **Соберите проект**:
   ```bash
   npm run build
   ```

4. **Создайте архив с необходимыми файлами**:
   ```bash
   # На Windows (PowerShell):
   Compress-Archive -Path .next,public,package.json,package-lock.json,next.config.js,tsconfig.json -DestinationPath build.zip
   
   # На Linux/Mac:
   zip -r build.zip .next public package.json package-lock.json next.config.js tsconfig.json
   ```

5. **Загрузите архив на сервер** и распакуйте в рабочую директорию

6. **На сервере установите только production зависимости**:
   ```bash
   npm install --production
   ```

7. **Запустите production сервер**:
   ```bash
   npm start
   ```

## Альтернативный вариант - обновить deploy.sh:

Если хотите автоматизировать процесс, обновите `deploy.sh` чтобы он:
1. Проверял наличие папки `.next`
2. Если папки нет - собирал проект
3. Если сборка не удалась - использовал предварительно собранные файлы

## Важно:

- Папка `.next` содержит собранные файлы проекта
- Папка `public` содержит статические файлы
- Файлы конфигурации (`next.config.js`, `tsconfig.json`) нужны для запуска
- `package.json` и `package-lock.json` нужны для установки зависимостей

