// Iframe event handler utility
// This file handles iframe events that were previously inline scripts

class IframeEventHandler {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupIframeEvents());
    } else {
      this.setupIframeEvents();
    }
  }

  setupIframeEvents() {
    const iframe = document.getElementById('game-iframe');
    
    if (iframe) {
      // Add event listeners for iframe events
      iframe.addEventListener('load', (event) => this.handleIframeLoad(event));
      iframe.addEventListener('error', (event) => this.handleIframeError(event));
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
