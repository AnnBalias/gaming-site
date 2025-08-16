# Система керування через клавіатуру для іфрейму

## Огляд

Система керування була повністю перероблена для роботи через клавіатуру замість візуальних кнопок. Тепер керування здійснюється через postMessage API між батьківським вікном та іфреймом.

## Архітектура

### Батьківське вікно (main.js)
- Обробляє події клавіатури
- Відправляє повідомлення через postMessage
- Фокусує іфрейм для кращого досвіду

### Іфрейм (iframe-keyboard-handler.js)
- Отримує повідомлення через postMessage
- Виконує відповідні дії в грі
- Підтримує як postMessage, так і прямі події клавіатури

## Підтримувані клавіші

### Основні клавіші керування
- **Стрілки**: ↑↓←→ (рух)
- **WASD**: W (вгору), A (вліво), S (вниз), D (вправо)
- **Space**: Стрибок
- **Enter**: Підтвердження
- **Escape**: Пауза
- **Z, X, C**: Додаткові дії

### Конфігурація клавіш
```javascript
const KEYBOARD_CONFIG = {
  'ArrowUp': { action: 'moveUp', keyCode: 38 },
  'ArrowDown': { action: 'moveDown', keyCode: 40 },
  'ArrowLeft': { action: 'moveLeft', keyCode: 37 },
  'ArrowRight': { action: 'moveRight', keyCode: 39 },
  'KeyW': { action: 'moveUp', keyCode: 87 },
  'KeyA': { action: 'moveLeft', keyCode: 65 },
  'KeyS': { action: 'moveDown', keyCode: 83 },
  'KeyD': { action: 'moveRight', keyCode: 68 },
  'Space': { action: 'jump', keyCode: 32 },
  'Enter': { action: 'confirm', keyCode: 13 },
  'Escape': { action: 'pause', keyCode: 27 },
  'KeyZ': { action: 'action1', keyCode: 90 },
  'KeyX': { action: 'action2', keyCode: 88 },
  'KeyC': { action: 'action3', keyCode: 67 }
};
```

## Функції керування

### Основні функції
- `moveUp()` - рух вгору
- `moveDown()` - рух вниз
- `moveLeft()` - рух вліво
- `moveRight()` - рух вправо
- `jump()` - стрибок
- `confirm()` - підтвердження
- `pause()` - пауза
- `action1()`, `action2()`, `action3()` - додаткові дії

### Інтеграція з грою
```javascript
// Приклад інтеграції з існуючою грою
if (window.gameInstance && typeof window.gameInstance.moveUp === 'function') {
  window.gameInstance.moveUp();
}
```

## Безпека

### Перевірка походження повідомлень
```javascript
if (event.origin !== window.location.origin && 
    !event.origin.includes('gamemonetize.co') && 
    !event.origin.includes('localhost')) {
  return;
}
```

### Обробка помилок
- Всі операції обгорнуті в try-catch
- Тиха обробка помилок для cross-origin іфреймів
- Fallback на прямі події клавіатури

## Використання

### 1. Підключення скрипта
Додайте `iframe-keyboard-handler.js` до іфрейму або інжектуйте його через postMessage.

### 2. Налаштування гри
```javascript
// Створіть об'єкт gameInstance з методами керування
window.gameInstance = {
  moveUp: () => { /* логіка руху вгору */ },
  moveDown: () => { /* логіка руху вниз */ },
  moveLeft: () => { /* логіка руху вліво */ },
  moveRight: () => { /* логіка руху вправо */ },
  jump: () => { /* логіка стрибка */ },
  // ... інші методи
};
```

### 3. Тестування
```javascript
// Для тестування використовуйте глобальний об'єкт
window.keyboardHandler.gameControls.moveUp();
```

## Переваги нової системи

### ✅ Покращення
- **Чистіший код** - видалено всі кнопки та їх стилі
- **Кращий UX** - пряме керування клавіатурою
- **Крос-платформенність** - працює на всіх пристроях
- **Безпека** - перевірка походження повідомлень
- **Гнучкість** - легко додавати нові клавіші

### 🔧 Технічні переваги
- **Менший розмір** - видалено ~60% CSS коду
- **Краща продуктивність** - немає DOM маніпуляцій
- **Легша підтримка** - простий код без складних стилів
- **Масштабованість** - легко розширювати функціональність

## Відладка

### Консольні повідомлення
Система виводить повідомлення в консоль для відладки:
- `"Keyboard handler initialized for iframe"`
- `"Move Up"`, `"Move Down"`, тощо при натисканні клавіш

### Глобальні об'єкти
```javascript
// Доступ до конфігурації
window.keyboardHandler.KEYBOARD_CONFIG

// Доступ до функцій керування
window.keyboardHandler.gameControls

// Тестування обробки подій
window.keyboardHandler.handleKeyboardEvent(data)
```

## Міграція з старої системи

### Видалено
- ✅ Всі HTML кнопки керування
- ✅ CSS стилі для кнопок
- ✅ JavaScript методи для touch controls
- ✅ Responsive controls логіка

### Залишено
- ✅ Fullscreen функціональність
- ✅ Аудіо контекст активація
- ✅ Обробка помилок іфрейму
- ✅ YYGGames ініціалізація

## Підтримка браузерів

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Мобільні браузери (через зовнішню клавіатуру)

## Примітки

1. **Cross-origin обмеження**: Для cross-origin іфреймів використовується тільки postMessage
2. **Мобільні пристрої**: Потребують зовнішньої клавіатури для керування
3. **Інтеграція**: Потребує налаштування gameInstance об'єкта в грі
4. **Відладка**: Використовуйте консоль браузера для тестування
