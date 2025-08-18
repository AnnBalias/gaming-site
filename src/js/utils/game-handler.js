// Game handler utility

class GameHandler {
  constructor() {
    this.iframe = null;
    this.fullscreenBtn = null;
    this.startBtn = null;
    this.retryBtn = null;
    this.adblockWarning = null;
    this.gameOverlay = null;
    this.loadAttempts = 0;
    this.maxLoadAttempts = 3;
    this.init();
  }

  init() {
    this.iframe = document.getElementById("game-iframe");
    this.fullscreenBtn = document.getElementById("fullscreen-btn");
    this.startBtn = document.getElementById("start-game-btn");
    this.retryBtn = document.getElementById("retry-game-btn");
    this.adblockWarning = document.getElementById("adblock-warning");
    this.gameOverlay = document.getElementById("game-overlay");

    // Make handler globally accessible for iframe events
    window.gameHandler = this;

    // Only initialize if we're on a page with game elements
    if (this.iframe || this.fullscreenBtn || this.startBtn) {
      this.setupEventListeners();
      this.checkAdBlocker();
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

    if (this.retryBtn) {
      this.retryBtn.addEventListener("click", () => this.retryGame());
    }

    // Listen for iframe load events
    if (this.iframe) {
      this.iframe.addEventListener("load", (e) => this.onIframeLoad(e));
      this.iframe.addEventListener("error", (e) => this.onIframeError(e));
    }
  }

  checkAdBlocker() {
    // Simple ad blocker detection
    const testAd = document.createElement("div");
    testAd.innerHTML = "&nbsp;";
    testAd.className = "adsbox";
    testAd.style.position = "absolute";
    testAd.style.left = "-10000px";
    document.body.appendChild(testAd);

    setTimeout(() => {
      const isAdBlockerActive = testAd.offsetHeight === 0;
      document.body.removeChild(testAd);

      if (isAdBlockerActive) {
        this.showAdBlockerWarning();
      }
    }, 100);
  }

  showAdBlockerWarning() {
    if (this.adblockWarning) {
      this.adblockWarning.style.display = "block";
    }
  }

  hideAdBlockerWarning() {
    if (this.adblockWarning) {
      this.adblockWarning.style.display = "none";
    }
  }

  setupIframeFallback() {
    // Set up timeout for iframe loading
    setTimeout(() => {
      if (this.iframe && !this.iframe.contentWindow) {
        this.handleLoadError("Iframe failed to load within timeout");
      }
    }, 10000); // 10 second timeout
  }

  onIframeLoad(event) {
    this.loadAttempts = 0;
    this.hideAdBlockerWarning();

    try {
      // Try to access iframe content to check if it's actually loaded
      const iframeDoc =
        this.iframe.contentDocument || this.iframe.contentWindow.document;
      if (iframeDoc && iframeDoc.readyState === "complete") {
        this.handleSuccessfulLoad();
      }
    } catch (error) {
      // Cross-origin restrictions - this is normal for external games
      this.handleSuccessfulLoad();
    }
  }

  onIframeError(event) {
    // Silently handle 404 and other common iframe errors
    if (
      window.EnvironmentHelpers &&
      window.EnvironmentHelpers.shouldSilentFail("iframe error")
    ) {
      return;
    }
    console.error("Iframe error:", event);
    this.handleLoadError("Iframe failed to load");
  }

  handleSuccessfulLoad() {
    // Game loaded successfully
    if (this.gameOverlay) {
      this.gameOverlay.style.display = "none";
    }
    this.hideAdBlockerWarning();
  }

  handleLoadError(error) {
    console.error("Game load error:", error);
    this.loadAttempts++;

    if (this.loadAttempts >= this.maxLoadAttempts) {
      this.showAdBlockerWarning();
      return;
    }

    // Try alternative loading method
    this.retryGame();
  }

  retryGame() {
    if (!this.iframe) return;

    // Try loading without sandbox first
    if (this.loadAttempts === 1) {
      this.iframe.removeAttribute("sandbox");
    }
    // Try with minimal sandbox
    else if (this.loadAttempts === 2) {
      this.iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    }

    // Reload iframe
    const currentSrc = this.iframe.src;
    this.iframe.src = "";
    setTimeout(() => {
      this.iframe.src = currentSrc;
    }, 100);
  }

  toggleFullscreen() {
    if (!this.iframe) return;

    if (!document.fullscreenElement) {
      this.iframe.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed:", err);
        // Fallback: try to make iframe larger
        this.iframe.style.width = "100vw";
        this.iframe.style.height = "100vh";
        this.iframe.style.position = "fixed";
        this.iframe.style.top = "0";
        this.iframe.style.left = "0";
        this.iframe.style.zIndex = "9999";
      });
    } else {
      document.exitFullscreen();
      // Reset iframe size if we used fallback
      this.iframe.style.width = "";
      this.iframe.style.height = "";
      this.iframe.style.position = "";
      this.iframe.style.top = "";
      this.iframe.style.left = "";
      this.iframe.style.zIndex = "";
    }
  }

  startGame() {
    if (this.iframe) {
      // Hide overlay and show iframe
      if (this.gameOverlay) {
        this.gameOverlay.style.display = "none";
      }

      this.iframe.style.display = "block";
      this.iframe.focus();

      // Try to communicate with the game
      try {
        this.iframe.contentWindow.postMessage(
          {
            type: "START_GAME",
            source: "parent",
          },
          "*"
        );
      } catch (error) {
        console.warn("Could not send message to iframe:", error);
      }
    }
  }
}

// Initialize game handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GameHandler();
});
