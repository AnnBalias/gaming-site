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
