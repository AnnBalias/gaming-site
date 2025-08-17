// Game handler utility

class GameHandler {
  constructor() {
    this.iframe = null;
    this.fullscreenBtn = null;
    this.startBtn = null;
    this.init();
  }

  init() {
    this.iframe = document.getElementById("game-iframe");
    this.fullscreenBtn = document.getElementById("fullscreen-btn");
    this.startBtn = document.getElementById("start-game-btn");

    // Only initialize if we're on a page with game elements
    if (this.iframe || this.fullscreenBtn || this.startBtn) {
      this.setupEventListeners();
      this.loadExternalScripts();
    }
  }

  setupEventListeners() {
    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener("click", () =>
        this.toggleFullscreen()
      );
    }

    if (this.startBtn) {
      this.startBtn.addEventListener("click", () => this.startGame());
    }
  }

  async loadExternalScripts() {
    try {
      // Skip external scripts to prevent errors
      // The game will handle its own SDK initialization
    } catch (error) {
      // Handle script loading errors silently
      // External scripts loading failed, continuing without SDKs
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  initializeSDKs() {
    // Skip SDK initialization to prevent errors
    // The game will handle its own SDK initialization
  }

  toggleFullscreen() {
    if (!this.iframe) return;

    if (!document.fullscreenElement) {
      this.iframe.requestFullscreen().catch((err) => {
        // Handle fullscreen errors silently
      });
    } else {
      document.exitFullscreen();
    }
  }

  startGame() {
    if (this.iframe) {
      this.iframe.style.display = "block";
      this.iframe.focus();
    }
  }
}

// Initialize game handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GameHandler();
});
