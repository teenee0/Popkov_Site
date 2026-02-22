# Popkov_Site — сайт на React (Vite)

Одностраничное приложение (SPA) на React по структуре как VendorVillage front: Vite, React, react-router-dom, без SSR.

## Запуск

- **Разработка (порт 9999):**
  ```bash
  npm install
  npm run dev
  ```
  Сайт: http://localhost:9999

- **Сборка и просмотр прода (порт 8899):**
  ```bash
  npm run build
  npm run preview
  ```
  Сайт: http://localhost:8899

## Структура (как у VendorVillage front)

- `src/main.jsx` — точка входа
- `src/App.jsx` — маршруты и layout (Header, Footer)
- `src/pages/` — страницы: Home, Catalog, CatalogCategory, About, Contacts, Delivery, Payment
- `src/components/` — Header, Footer, ContactModal
- `src/config/` — environment.js (API_BASE_URL для dev/prod), site.js (название, город, контакты)
- `src/api/` — categoriesApi.js (запросы к `/marketplace/api/categories/`)

## Конфигурация

- **Сайт:** `src/config/site.js` — имя, город, телефон, адрес.
- **API (разные хосты для dev и prod):**
  - **Разработка** (`npm run dev`): `http://127.0.0.1:8000` — категории: `/marketplace/api/categories/`, `/marketplace/api/categories/237/`.
  - **Продакшен** (`npm run build`): `https://api.vendorvillage.store` — те же пути. Переопределить можно через `.env.production`: `VITE_API_BASE_URL=...`.
- **Логотип:** `public/images/logo.png`.

## Хостинг

После `npm run build` папка `dist/` — статические файлы. Разместите содержимое `dist/` на любом хостинге (нужен SPA fallback: все маршруты ведут на `index.html`).