# 🚀 Next.js Template Guide

Універсальний шаблон Next.js з модульною архітектурою для швидкого старту проектів.

## 📋 Доступні функції

| Функція | Опис | Залежності |
|---------|------|------------|
| **Auth** | JWT авторизація, OAuth провайдери | `jose`, `bcrypt` |
| **i18n** | Інтернаціоналізація з next-intl | `next-intl` |
| **Payments** | Stripe, PayPal інтеграція | `stripe` |
| **Storage** | AWS S3, файлове сховище | `aws-sdk` |
| **Analytics** | Google Analytics, метрики | - |

## ⚙️ Налаштування функцій

### 1. Увімкнути/вимкнути функції

Встановіть змінні середовища в `.env`:

```bash
# Основні функції
ENABLE_AUTH=true
ENABLE_I18N=true
ENABLE_PAYMENTS=false
ENABLE_STORAGE=false
ENABLE_ANALYTICS=false

# UI функції
ENABLE_DARK_MODE=true
ENABLE_NOTIFICATIONS=true
ENABLE_SEARCH=false
```

### 2. Видалити невикористані функції

```bash
# Видалити авторизацію
node scripts/remove-feature.js auth

# Видалити інтернаціоналізацію
node scripts/remove-feature.js i18n

# Видалити платежі
node scripts/remove-feature.js payments
```

## 🏗️ Структура проекту

```
├── app/                    # Next.js App Router
│   ├── (private)/         # Приватні сторінки
│   ├── (public)/          # Публічні сторінки
│   └── api/               # API роути
├── components/            # React компоненти
│   ├── ui/               # Базові UI компоненти
│   ├── forms/            # Форми
│   └── layout/           # Layout компоненти
├── config/               # Конфігурації
│   ├── auth.config.ts    # Налаштування авторизації
│   ├── i18n.config.ts    # Налаштування i18n
│   └── features.config.ts # Флаги функцій
├── lib/                  # Утиліти та хелпери
├── modules/              # Модулі функцій
├── middlewares/          # Middleware функції
└── scripts/              # Скрипти для автоматизації
```

## 🚀 Швидкий старт

### 1. Клонування та встановлення

```bash
git clone <your-template-repo>
cd next-template
npm install
```

### 2. Налаштування середовища

```bash
cp .env.example .env
# Відредагуйте .env файл
```

### 3. Налаштування бази даних

```bash
# PostgreSQL
createdb next_template
npx prisma migrate dev
```

### 4. Запуск

```bash
npm run dev
```

## 🎯 Сценарії використання

### Сценарій 1: Простий лендінг
```bash
# Вимкнути всі функції крім базових
ENABLE_AUTH=false
ENABLE_I18N=false
ENABLE_PAYMENTS=false
ENABLE_STORAGE=false
```

### Сценарій 2: Блог з авторизацією
```bash
ENABLE_AUTH=true
ENABLE_I18N=true
ENABLE_PAYMENTS=false
ENABLE_STORAGE=true
```

### Сценарій 3: E-commerce
```bash
ENABLE_AUTH=true
ENABLE_I18N=true
ENABLE_PAYMENTS=true
ENABLE_STORAGE=true
ENABLE_ANALYTICS=true
```

## 🔧 Кастомізація

### Додати нову функцію

1. Створити модуль в `modules/`
2. Додати конфіг в `config/`
3. Додати middleware (якщо потрібно)
4. Оновити `features.config.ts`

### Видалити функцію повністю

```bash
node scripts/remove-feature.js <feature-name>
```

## 📚 Документація

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [next-intl](https://next-intl-docs.vercel.app/)

## 🤝 Підтримка

Якщо у вас є питання або пропозиції, створіть issue в репозиторії.
