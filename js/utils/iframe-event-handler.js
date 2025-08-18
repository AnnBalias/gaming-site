// Iframe event handler utility
// This file handles iframe events that were previously inline scripts

class IframeEventHandler {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded and game handler to be available
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.waitForGameHandler()
      );
    } else {
      this.waitForGameHandler();
    }
  }

  waitForGameHandler() {
    // Wait for game handler to be initialized
    if (window.gameHandler) {
      this.setupIframeEvents();
    } else {
      // Retry after a short delay
      setTimeout(() => this.waitForGameHandler(), 100);
    }
  }

  setupIframeEvents() {
    const iframe = document.getElementById("game-iframe");

    if (iframe) {
      // Add event listeners for iframe events
      iframe.addEventListener("load", (event) => this.handleIframeLoad(event));
      iframe.addEventListener("error", (event) =>
        this.handleIframeError(event)
      );
    } else {
      // If iframe doesn't exist yet, retry after a short delay
      setTimeout(() => this.setupIframeEvents(), 100);
    }
  }

  handleIframeLoad(event) {
    // Call the game handler if it exists
    if (window.gameHandler && window.gameHandler.onIframeLoad) {
      window.gameHandler.onIframeLoad(event);
    }
  }

  handleIframeError(event) {
    // Call the game handler if it exists
    if (window.gameHandler && window.gameHandler.onIframeError) {
      window.gameHandler.onIframeError(event);
    }
  }
}

// Initialize iframe event handler
new IframeEventHandler();
