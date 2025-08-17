# Data Loading Fix - Підключення data.json

## Проблема

Після рефакторингу на модульну структуру дані з `data.json` не відображалися на сторінці. Модулі використовували статичні дані замість динамічного завантаження з JSON файлу.

## Причина

1. **Статичні дані**: Модулі `src/js/data/main.js` та `src/js/data/hero.js` містили статичні дані замість завантаження з `data.json`
2. **Неправильна структура**: Модулі очікували іншу структуру даних, ніж та, що була в `data.json`
3. **Відсутність fallback**: Не було механізму fallback на випадок помилки завантаження

## Виправлення

### 1. **Оновлення `src/js/data/main.js`**

**До:**

```javascript
const gameData = {
  // статичні дані
};
```

**Після:**

```javascript
let gameData = null;

// Fallback data
const fallbackData = {
  /* ... */
};

// Динамічне завантаження
async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    gameData = data;
  } catch (error) {
    gameData = fallbackData;
  }
  initializeRendering();
}
```

### 2. **Оновлення `src/js/data/hero.js`**

**До:**

```javascript
const heroContent = {
  // статичні дані
};
```

**Після:**

```javascript
let heroContent = null;

async function loadHeroData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    heroContent = {
      image: data.hero.gamePreview?.image || "assets/images/fnf-hero-bg.jpg",
      title: data.hero.title || "Friday Night Funkin",
      subtitle: data.hero.description || "...",
    };
  } catch (error) {
    heroContent = fallbackHeroContent;
  }
  renderHeroSection();
}
```

### 3. **Адаптація до структури data.json**

Оновлено функції рендерингу для роботи з реальною структурою `data.json`:

```javascript
// Reviews
const reviews = reviewsData.reviews || reviewsData.items || [];

// News
const articles = newsData.articles || newsData.items || [];

// Footer
const sections = footerData.sections;
Object.keys(sections).map((sectionKey) => {
  const section = sections[sectionKey];
  // рендеринг секції
});
```

### 4. **Оновлення `src/js/utils/news-handler.js`**

Додано підтримку правильної структури новин:

```javascript
if (window.gameData && window.gameData.news && window.gameData.news.articles) {
  this.newsData = window.gameData.news.articles;
} else if (
  window.gameData &&
  window.gameData.news &&
  window.gameData.news.items
) {
  this.newsData = window.gameData.news.items;
}
```

## Результат

### ✅ **Працюючі функції:**

- Динамічне завантаження даних з `data.json`
- Fallback дані при помилці завантаження
- Правильне відображення всіх секцій сайту
- Підтримка модальних вікон новин
- Контактна форма з даними з JSON

### ✅ **Переваги:**

- **Гнучкість**: Легко змінювати контент через `data.json`
- **Надійність**: Fallback дані забезпечують роботу сайту
- **Модульність**: Кожен модуль завантажує свої дані
- **Сумісність**: Працює з існуючою структурою `data.json`

## Структура data.json

Сайт тепер правильно працює з такою структурою:

```json
{
  "hero": {
    "title": "Friday Night Funkin",
    "description": "...",
    "gamePreview": { "image": "..." }
  },
  "game": {
    "title": "Play Friday Night Funkin",
    "description": "..."
  },
  "howToPlay": {
    "title": "How to Play",
    "steps": [
      {
        "step": "1",
        "title": "...",
        "description": "..."
      }
    ]
  },
  "reviews": {
    "title": "Player Reviews",
    "reviews": [
      {
        "player": "...",
        "rating": 5,
        "comment": "..."
      }
    ]
  },
  "news": {
    "title": "Latest News",
    "articles": [
      {
        "title": "...",
        "excerpt": "...",
        "content": "...",
        "date": "2025-01-15"
      }
    ]
  },
  "contact": {
    "title": "Contact Us",
    "info": {
      "email": "...",
      "address": "...",
      "phone": "..."
    }
  },
  "disclaimer": {
    "title": "Disclaimer",
    "blocks": [
      {
        "title": "...",
        "content": "..."
      }
    ]
  },
  "footer": {
    "sections": {
      "game": {
        "title": "Game",
        "links": [{ "text": "...", "href": "..." }]
      }
    },
    "copyright": "..."
  },
  "cookieBar": {
    "message": "...",
    "accept": "Accept",
    "decline": "Decline"
  }
}
```

## Тестування

1. **Запуск сервера**: `npm run dev`
2. **Перевірка консолі**: Повинні бути повідомлення про успішне завантаження даних
3. **Перевірка контенту**: Всі секції повинні відображати дані з `data.json`
4. **Тест fallback**: При видаленні `data.json` сайт повинен працювати з fallback даними

## Висновок

Проблема з підключенням `data.json` успішно вирішена. Сайт тепер:

- Динамічно завантажує дані з JSON файлу
- Має надійний fallback механізм
- Правильно працює з існуючою структурою даних
- Зберігає всі переваги модульної архітектури
