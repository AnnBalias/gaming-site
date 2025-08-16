// Environment Configuration
// Handles different environments and fallbacks for external services

const Environment = {
  // Backend configuration
  BACKEND: {
    URL: 'http://localhost:9998',
    TIMEOUT: 3000,
    ENDPOINTS: {
      CONFIG: '/config',
      DATA: '/data'
    }
  },

  // External services configuration
  EXTERNAL_SERVICES: {
    GAMEMONETIZE: {
      ENABLED: true,
      SDK_URL: 'https://html5.gamemonetize.co/sdk.js',
      GAME_URL: 'https://html5.gamemonetize.co/8g62o78s1wjhsiu54xlmql32h7pagsek/',
      FALLBACK: true
    },
    YYGGAMES: {
      ENABLED: true,
      INIT_TIMEOUT: 5000,
      MAX_ATTEMPTS: 10,
      FALLBACK: true
    }
  },

  // Error handling configuration
  ERROR_HANDLING: {
    SILENT_FAILURES: [
      'gamemonetize',
      'YYGGames', 
      'cocos2d',
      'about:blank',
      'sandbox',
      'frame',
      'ampproject',
      'google',
      'ads',
      'analytics',
      'doubleclick',
      'googlesyndication'
    ],
    LOG_LEVEL: 'warn' // 'error', 'warn', 'info', 'debug'
  },

  // Development settings
  DEVELOPMENT: {
    DEBUG_MODE: false,
    LOG_EXTERNAL_ERRORS: false,
    SHOW_FALLBACK_MESSAGES: true
  }
};

// Helper functions
const EnvironmentHelpers = {
  // Check if we're in development mode
  isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '9998';
  },

  // Check if external service should be enabled
  isServiceEnabled(serviceName) {
    return Environment.EXTERNAL_SERVICES[serviceName]?.ENABLED !== false;
  },

  // Check if error should be handled silently
  shouldSilentFail(errorMessage) {
    return Environment.ERROR_HANDLING.SILENT_FAILURES.some(keyword => 
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  // Get backend URL with fallback
  getBackendUrl() {
    if (this.isDevelopment()) {
      return Environment.BACKEND.URL;
    }
    // In production, you might want to use a different URL
    return window.location.origin;
  },

  // Log message based on environment
  log(message, level = 'info') {
    if (Environment.DEVELOPMENT.DEBUG_MODE || 
        level === 'error' || 
        level === 'warn') {
      console[level](message);
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Environment, EnvironmentHelpers };
} else {
  window.Environment = Environment;
  window.EnvironmentHelpers = EnvironmentHelpers;
}
