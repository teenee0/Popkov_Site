#!/bin/bash
# Скрипт для проверки и автоматического перезапуска Next.js сервера

PM2_APP_NAME="nextjs-qwertysb"
LOG_FILE="/home/q/qwertysb/qwertysb.beget.tech/popkov_site/logs/check_restart.log"

# Создаем директорию для логов, если её нет
mkdir -p "$(dirname "$LOG_FILE")"

# Функция для логирования
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Проверяем, запущен ли процесс
if ! pm2 list | grep -q "$PM2_APP_NAME.*online"; then
    log "⚠️  Процесс $PM2_APP_NAME не запущен или не работает. Перезапускаю..."
    
    # Пытаемся перезапустить
    pm2 restart "$PM2_APP_NAME" >> "$LOG_FILE" 2>&1
    
    # Если перезапуск не удался, запускаем заново
    sleep 2
    if ! pm2 list | grep -q "$PM2_APP_NAME.*online"; then
        log "❌ Перезапуск не удался. Запускаю заново..."
        cd /home/q/qwertysb/qwertysb.beget.tech/popkov_site
        pm2 start ecosystem.config.js >> "$LOG_FILE" 2>&1
    else
        log "✅ Процесс успешно перезапущен"
    fi
else
    # Проверяем, отвечает ли сервер
    if ! curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4000/ | grep -q "200"; then
        log "⚠️  Сервер не отвечает. Перезапускаю..."
        pm2 restart "$PM2_APP_NAME" >> "$LOG_FILE" 2>&1
    fi
fi
