# Refactoring Guide - Modular JavaScript Structure

## Overview

The project has been refactored to use a modular JavaScript structure similar to the reference project. This improves code organization, maintainability, and follows modern development practices.

## New File Structure

### Before (Monolithic)
```
src/js/
├── main.js (1818 lines - everything in one file)
└── iframe-keyboard-handler.js
```

### After (Modular)
```
src/js/
├── main-new.js (main initialization)
├── data/
│   ├── hero.js (hero section data and rendering)
│   └── main.js (main content data and rendering functions)
├── utils/
│   ├── builder.js (HTML component loading)
│   ├── cookies-modal.js (cookie consent handling)
│   ├── contact-form.js (contact form validation and submission)
│   ├── game-handler.js (game iframe and controls)
│   └── news-handler.js (news modals and interactions)
└── iframe-keyboard-handler.js (legacy - can be removed)
```

## Module Descriptions

### Data Modules (`src/js/data/`)

#### `hero.js`
- Contains hero section data (title, subtitle, image)
- Handles hero section rendering
- Self-contained module with its own DOMContentLoaded listener

#### `main.js`
- Contains all website content data (game info, how-to-play, reviews, news, contact, disclaimer, footer, cookie bar)
- Provides rendering functions for each section
- Exports `gameData` object for use by other modules

### Utility Modules (`src/js/utils/`)

#### `builder.js`
- Handles dynamic loading of HTML components (header, footer)
- Sets up mobile menu functionality
- Manages active navigation links

#### `cookies-modal.js`
- Manages cookie consent bar
- Handles accept/decline actions
- Stores user preference in localStorage

#### `contact-form.js`
- Handles contact form submission
- Provides form validation
- Shows success/error messages

#### `game-handler.js`
- Manages game iframe functionality
- Handles start game and fullscreen controls
- Loads external scripts (GameMonetize SDK)
- Manages keyboard input for game controls

#### `news-handler.js`
- Handles news modal functionality
- Creates dynamic news modals
- Manages modal animations and interactions

### Main Module (`src/js/main-new.js`)
- Provides global error handling
- Sets up smooth scrolling
- Initializes the application
- Makes data available globally for other modules

## Benefits of the New Structure

### 1. **Separation of Concerns**
- Each module has a specific responsibility
- Data is separated from logic
- Rendering functions are organized by section

### 2. **Maintainability**
- Easier to find and modify specific functionality
- Smaller, focused files are easier to understand
- Reduced risk of conflicts when multiple developers work on different features

### 3. **Reusability**
- Modules can be easily reused across different pages
- Data modules can be shared between components
- Utility functions are isolated and testable

### 4. **Performance**
- Modules load in parallel
- Better caching (individual files can be cached separately)
- Easier to implement lazy loading if needed

### 5. **Debugging**
- Easier to identify which module contains an issue
- Better error isolation
- Clearer stack traces

## Script Loading Order

The scripts are loaded in a specific order to ensure dependencies are met:

```html
<script src="js/utils/builder.js"></script>           <!-- Loads HTML components first -->
<script src="js/data/hero.js"></script>              <!-- Hero data and rendering -->
<script src="js/data/main.js"></script>              <!-- Main content data -->
<script src="js/utils/cookies-modal.js"></script>    <!-- Cookie functionality -->
<script src="js/utils/contact-form.js"></script>     <!-- Contact form handling -->
<script src="js/utils/game-handler.js"></script>     <!-- Game functionality -->
<script src="js/utils/news-handler.js"></script>     <!-- News modals -->
<script src="js/main-new.js"></script>               <!-- Main initialization -->
```

## Migration Notes

### Removed from Original `main.js`
- All data objects moved to `src/js/data/main.js`
- Hero data moved to `src/js/data/hero.js`
- Utility functions split into separate modules
- Error handling simplified and moved to main module

### Preserved Functionality
- All original features work the same way
- External script loading (GameMonetize SDK)
- Form validation and submission
- Cookie consent handling
- Game controls and fullscreen functionality
- News modal system
- Smooth scrolling navigation

### New Features
- Better error handling and isolation
- Modular data management
- Cleaner separation of concerns
- More maintainable code structure

## Development Workflow

### Adding New Features
1. Determine if it's data, utility, or main functionality
2. Create appropriate module or add to existing one
3. Follow the established patterns in similar modules
4. Update this guide if adding new module types

### Modifying Existing Features
1. Locate the relevant module
2. Make changes within that module
3. Test that other modules aren't affected
4. Update documentation if needed

### Data Changes
- Update `src/js/data/main.js` for content changes
- Update `src/js/data/hero.js` for hero section changes
- Consider creating new data modules for large new sections

## Testing

Each module can be tested independently:
- Data modules: Test rendering functions
- Utility modules: Test specific functionality
- Main module: Test initialization and error handling

## Future Improvements

1. **ES6 Modules**: Convert to proper ES6 modules with import/export
2. **Bundling**: Use webpack or similar for production builds
3. **TypeScript**: Add type safety
4. **Testing**: Add unit tests for each module
5. **Lazy Loading**: Implement lazy loading for non-critical modules

## Compatibility

The refactored code maintains full compatibility with:
- Modern browsers (ES6+)
- Existing HTML structure
- Current build process (Gulp)
- External dependencies (GameMonetize SDK)

## Rollback Plan

If issues arise, the original `main.js` file is preserved and can be restored by:
1. Reverting `src/index.html` to use `js/main.min.js`
2. Running `gulp build` to regenerate the minified version
3. Removing the new modular files if needed
