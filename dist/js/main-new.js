// Main application initialization

class FridayNightFunkin {
  constructor() {
    this.init();
  }

  init() {
    this.setupGlobalErrorHandling();
    this.setupSmoothScrolling();
    this.setupEnvironmentHelpers();
  }

  setupGlobalErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      // Handle errors silently in production
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      // Handle promise rejections silently in production
    });
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupEnvironmentHelpers() {
    // Make gameData available globally for other modules
    if (window.gameData) {
      // GameData is already available from data modules
    }
  }
}

// Environment helpers for external SDKs
class EnvironmentHelpers {
  static init() {
    // Initialize any environment-specific helpers
    this.setupExternalSDKs();
  }

  static setupExternalSDKs() {
    // Setup external SDKs if needed
    if (typeof window.YYGGames !== 'undefined') {
      try {
        window.YYGGames.init();
      } catch (error) {
        // Handle initialization errors silently
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FridayNightFunkin();
  EnvironmentHelpers.init();
});
