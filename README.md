# Сайт Попков — плитка в Актобе

Next.js сайт с SSR (Server-Side Rendering). Подходит для размещения на арендованном хостинге.

## Запуск

- **Разработка (dev):** порт **9999**
  ```bash
  npm run dev
  ```
  Сайт: http://localhost:9999

- **Продакшен (prod):** порт **8899**
  ```bash
  npm run build
  npm start
  ```
  Сайт: http://localhost:8899

## Структура

- `app/` — страницы (App Router)
  - `page.tsx` — главная
  - `catalog/` — каталог (SSR, данные с API или мок)
  - `about/`, `contacts/`, `delivery/`, `payment/` — информационные страницы
- `components/` — Header, Footer, ContactModal, StructuredData
- `config/site.ts` — настройки сайта (название, город, контакты)
- `lib/api.ts` — API категорий (переменная `NEXT_PUBLIC_API_URL` для бэкенда)
- `lib/image-utils.ts` — утилиты для изображений категорий

## Конфигурация

- **Сайт:** `config/site.ts` — имя, город, телефон, адрес, соцсети.
- **API (отдельно для dev и prod):**
  - Разработка: создайте `.env.development` с `API_URL=http://127.0.0.1:8000` (или ваш хост бэкенда).
  - Продакшен: создайте `.env.production` с `API_URL=https://ваш-api-хост.com`.
  - Next.js подставляет `.env.development` при `npm run dev` и `.env.production` при `npm run build`/`npm start`.
  - Используются ручки: `GET /marketplace/api/categories/` (список корневых категорий), `GET /marketplace/api/categories/<id>/` (категория и дочерние). Без `API_URL` каталог показывает мок-данные.
- **Логотип:** положите `logo.png` в `public/images/`. Если файла нет, в шапке и подвале показывается первая буква названия.

## Хостинг

Сборка локально и загрузка на сервер описана в [BUILD_LOCAL.md](./BUILD_LOCAL.md). На сервере после распаковки: `npm install --production` и `npm start` (порт 8899 или задайте `PORT=8899` в окружении).
