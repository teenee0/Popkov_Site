# BuildGood - Сайт строительных материалов

Современный сайт для магазина строительных товаров с SSR и оптимизированным SEO.

## Технологии

- **Next.js 14** - React фреймворк с SSR
- **TypeScript** - Типизированный JavaScript
- **CSS Modules** - Модульные стили

## Быстрый старт

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения:
```bash
# Скопируйте пример файла
cp env.example .env.local

# Отредактируйте .env.local и укажите URL вашего API сервера
```

3. Запустите dev-сервер:
```bash
npm run dev
```

4. Откройте [http://localhost:4000](http://localhost:4000) в браузере

## Конфигурация API

### Разработка (Development)

Для локальной разработки создайте файл `.env.local`:

```env
NEXT_PUBLIC_DEV_API_URL=http://127.0.0.1:8000
```

### Production

Для production установите переменную окружения:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Использование API

```typescript
import { categoriesApi } from '@/lib/api'

// Получить все категории
const categories = await categoriesApi.getAll()

// Получить категорию по ID
const category = await categoriesApi.getById(1)

// Получить категорию по slug
const category = await categoriesApi.getBySlug('ceramic-tile')
```

## Изменение названия компании

Название компании и другие настройки можно легко изменить в файле `config/site.ts`:

```typescript
export const siteConfig = {
  name: "BuildGood",  // Измените здесь
  // ... другие настройки
}
```

## Структура проекта

```
├── app/                 # App Router (Next.js 14)
│   ├── layout.tsx      # Корневой layout с SEO метаданными
│   ├── page.tsx        # Главная страница
│   └── globals.css     # Глобальные стили
├── components/          # React компоненты
│   ├── Header.tsx      # Шапка сайта
│   └── Footer.tsx      # Футер сайта
├── config/             # Конфигурация
│   ├── site.ts        # Настройки сайта и компании
│   └── api.ts         # Настройки API
└── lib/               # Утилиты
    └── api.ts         # API клиент
```

## SEO оптимизация

- Server-Side Rendering (SSR) для всех страниц
- Оптимизированные meta-теги
- Open Graph метаданные
- Структурированные данные JSON-LD
- Локальная оптимизация для Кокшетау

## Цветовая схема

- **Основной цвет**: #DC2626 (красный)
- **Фон**: #FFFFFF (белый)
- **Текст**: #1F2937 (темно-серый)

Цвета можно изменить в `app/globals.css` в переменных CSS.
