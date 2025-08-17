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

    this.setupEventListeners();
    this.loadExternalScripts();
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
      // Load Gamemonetize SDK
      await this.loadScript(
        "https://html5.gamemonetize.co/8g62o78s1wjhsiu54xlmql32h7pagsek/gamemonetize-sdk.js"
      );

      // Load YYGGames SDK
      await this.loadScript(
        "https://html5.gamemonetize.co/8g62o78s1wjhsiu54xlmql32h7pagsek/yyggames-sdk.js"
      );

      this.initializeSDKs();
    } catch (error) {
      // Handle script loading errors silently
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
    // Initialize YYGGames if available
    if (typeof YYGGames !== "undefined") {
      try {
        YYGGames.init();
      } catch (error) {
        // Handle initialization errors silently
      }
    }
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
