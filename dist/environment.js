// Environment Configuration
// Handles different environments and fallbacks for external services

const Environment = {
  // Backend configuration
  BACKEND: {
    URL: "http://localhost:9998",
    TIMEOUT: 3000,
    ENDPOINTS: {
      CONFIG: "/config",
      DATA: "/data",
    },
  },

  // External services configuration
  EXTERNAL_SERVICES: {
    GAMEMONETIZE: {
      ENABLED: true,
      SDK_URL: "https://html5.gamemonetize.co/sdk.js",
      GAME_URL:
        "https://html5.gamemonetize.co/8g62o78s1wjhsiu54xlmql32h7pagsek/",
      FALLBACK: true,
    },
    YYGGAMES: {
      ENABLED: true,
      INIT_TIMEOUT: 2000,
      MAX_ATTEMPTS: 2,
      FALLBACK: true,
    },
  },

  // Error handling configuration
  ERROR_HANDLING: {
    SILENT_FAILURES: [
      "gamemonetize",
      "YYGGames",
      "cocos2d",
      "about:blank",
      "sandbox",
      "frame",
      "ampproject",
      "google",
      "ads",
      "analytics",
      "doubleclick",
      "googlesyndication",
      "omweb-v1.js",
      "audiocontext",
      "must be resumed",
      "is not a function",
      "localhost:9998",
      "connection refused",
      "net::err_connection_refused",
      "blocked by adblocker",
      "favicon.ico",
      "404",
      "cors",
      "access-control-allow-origin",
    ],
    LOG_LEVEL: "error", // Only show errors in production
  },

  // Development settings
  DEVELOPMENT: {
    DEBUG_MODE: false,
    LOG_EXTERNAL_ERRORS: false,
    SHOW_FALLBACK_MESSAGES: false,
  },
};

// Helper functions
const EnvironmentHelpers = {
  // Check if we're in development mode
  isDevelopment() {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.port === "9998" ||
      window.location.port === "3000"
    );
  },

  // Check if external service should be enabled
  isServiceEnabled(serviceName) {
    return Environment.EXTERNAL_SERVICES[serviceName]?.ENABLED !== false;
  },

  // Check if error should be handled silently
  shouldSilentFail(errorMessage) {
    if (!errorMessage) return true;
    return Environment.ERROR_HANDLING.SILENT_FAILURES.some((keyword) =>
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  // Get backend URL with fallback
  getBackendUrl() {
    if (this.isDevelopment()) {
      return Environment.BACKEND.URL;
    }
    // In production, use relative paths
    return window.location.origin;
  },

  // Log message based on environment
  log(message, level = "info") {
    // Only log errors in production, unless in development mode
    if (this.isDevelopment() || level === "error") {
      console[level](message);
    }
  },
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Environment, EnvironmentHelpers };
} else {
  window.Environment = Environment;
  window.EnvironmentHelpers = EnvironmentHelpers;
}
