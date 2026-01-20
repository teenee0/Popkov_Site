#!/bin/bash

# === Скрипт деплоя Next.js для shared хостинга Beget ===
# Этот скрипт пытается собрать проект на сервере
# Если сборка не удалась из-за ограничений хостинга - использует предварительно собранные файлы

FRONTEND_DIR="/home/q/qwertysb/qwertysb.beget.tech/Popkov_Site"
PUBLIC_HTML_DIR="/home/q/qwertysb/qwertysb.beget.tech/public_html"

# === 1. Переходим в папку фронтенда ===
cd "$FRONTEND_DIR" || { echo "❌ Фронтенд папка не найдена!"; exit 1; }

# === 2. Жёсткий git pull ===
echo "📥 Сбрасываем локальные изменения и подтягиваем последние коммиты..."
git fetch origin
git reset --hard origin/master

# === 3. Устанавливаем зависимости ===
echo "📦 Устанавливаем npm зависимости..."
npm install

# === 4. Пытаемся собрать проект ===
echo "🔨 Пытаемся собрать проект..."
BUILD_SUCCESS=false
BUILD_ERROR=""

# Пытаемся собрать проект, перенаправляя ошибки в переменную
BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    BUILD_SUCCESS=true
    echo "✅ Сборка успешно завершена на сервере"
else
    echo "⚠️  Сборка на сервере не удалась"
    echo "$BUILD_OUTPUT" | tail -5
    
    # Проверяем наличие папки .next
    if [ -d ".next" ] && [ "$(ls -A .next 2>/dev/null)" ]; then
        echo "✅ Найдена папка .next с собранными файлами (предварительно собранные)"
        BUILD_SUCCESS=true
    else
        echo "❌ Папка .next не найдена или пуста"
        echo ""
        echo "💡 Решение:"
        echo "   1. Соберите проект локально: npm run build"
        echo "   2. Загрузите папку .next на сервер в директорию: $FRONTEND_DIR"
        echo "   3. Запустите скрипт деплоя снова"
        exit 1
    fi
fi

# === 5. Копируем необходимые файлы в public_html ===
if [ "$BUILD_SUCCESS" = true ]; then
    echo "📋 Копируем файлы в public_html..."
    
    # Копируем папку .next
    if [ -d ".next" ]; then
        echo "   → Копируем папку .next..."
        mkdir -p "$PUBLIC_HTML_DIR/.next"
        rsync -av --delete "$FRONTEND_DIR/.next/" "$PUBLIC_HTML_DIR/.next/" > /dev/null 2>&1
    fi
    
    # Копируем папку public
    if [ -d "public" ]; then
        echo "   → Копируем папку public..."
        rsync -av --delete "$FRONTEND_DIR/public/" "$PUBLIC_HTML_DIR/public/" > /dev/null 2>&1
    fi
    
    # Копируем необходимые конфигурационные файлы
    echo "   → Копируем конфигурационные файлы..."
    cp -f "$FRONTEND_DIR/package.json" "$PUBLIC_HTML_DIR/" 2>/dev/null || true
    cp -f "$FRONTEND_DIR/next.config.js" "$PUBLIC_HTML_DIR/" 2>/dev/null || true
    cp -f "$FRONTEND_DIR/tsconfig.json" "$PUBLIC_HTML_DIR/" 2>/dev/null || true
    
    # Копируем папку app и другие необходимые файлы для Next.js
    if [ -d "app" ]; then
        echo "   → Копируем папку app..."
        rsync -av --delete "$FRONTEND_DIR/app/" "$PUBLIC_HTML_DIR/app/" > /dev/null 2>&1
    fi
    
    if [ -d "components" ]; then
        echo "   → Копируем папку components..."
        rsync -av --delete "$FRONTEND_DIR/components/" "$PUBLIC_HTML_DIR/components/" > /dev/null 2>&1
    fi
    
    if [ -d "config" ]; then
        echo "   → Копируем папку config..."
        rsync -av --delete "$FRONTEND_DIR/config/" "$PUBLIC_HTML_DIR/config/" > /dev/null 2>&1
    fi
    
    if [ -d "lib" ]; then
        echo "   → Копируем папку lib..."
        rsync -av --delete "$FRONTEND_DIR/lib/" "$PUBLIC_HTML_DIR/lib/" > /dev/null 2>&1
    fi
    
    # Устанавливаем production зависимости в public_html
    echo "📦 Устанавливаем production зависимости в public_html..."
    cd "$PUBLIC_HTML_DIR"
    npm install --production --silent > /dev/null 2>&1
    
    echo ""
    echo "✅ Деплой завершён успешно!"
    echo ""
    echo "📝 Для запуска Next.js на Beget:"
    echo "   1. Убедитесь что Node.js включен в панели управления Beget"
    echo "   2. Настройте точку входа: server.js (если нужно)"
    echo "   3. Или используйте: cd $PUBLIC_HTML_DIR && npm start"
    echo ""
else
    echo "❌ Деплой не удался - сборка проекта не выполнена"
    exit 1
fi

