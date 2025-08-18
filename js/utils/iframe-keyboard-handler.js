// Iframe keyboard handler for better game interaction

class IframeKeyboardHandler {
  constructor() {
    this.iframe = null;
    this.isGameActive = false;
    this.init();
  }

  init() {
    this.iframe = document.getElementById("game-iframe");
    if (this.iframe) {
      this.setupKeyboardHandling();
      this.setupMessageHandling();
    }
  }

  setupKeyboardHandling() {
    // Handle keyboard events for the iframe
    document.addEventListener("keydown", (event) => {
      if (this.isGameActive && this.iframe) {
        this.forwardKeyEvent(event, "keydown");
      }
    });

    document.addEventListener("keyup", (event) => {
      if (this.isGameActive && this.iframe) {
        this.forwardKeyEvent(event, "keyup");
      }
    });

    // Focus management
    this.iframe.addEventListener("focus", () => {
      this.isGameActive = true;
    });

    this.iframe.addEventListener("blur", () => {
      this.isGameActive = false;
    });
  }

  setupMessageHandling() {
    // Listen for messages from the iframe
    window.addEventListener("message", (event) => {
      // Only accept messages from gamemonetize.com
      if (event.origin !== "https://html5.gamemonetize.co") {
        return;
      }

      try {
        const data = event.data;

        switch (data.type) {
          case "GAME_READY":
            this.isGameActive = true;
            this.hideOverlay();
            break;

          case "GAME_ERROR":
            console.error("Game error:", data.error);
            this.handleGameError(data.error);
            break;

          case "GAME_LOADED":
            this.handleGameLoaded();
            break;

          case "REQUEST_FULLSCREEN":
            this.requestFullscreen();
            break;

          default:
          // Handle other game messages
        }
      } catch (error) {
        console.warn("Error processing game message:", error);
      }
    });
  }

  forwardKeyEvent(event, type) {
    try {
      // Forward keyboard events to the iframe
      const keyEvent = new KeyboardEvent(type, {
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        which: event.which,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        bubbles: true,
        cancelable: true,
      });

      this.iframe.contentWindow.document.dispatchEvent(keyEvent);
    } catch (error) {
      // Cross-origin restrictions - this is normal
      console.debug("Could not forward key event to iframe:", error.message);
    }
  }

  hideOverlay() {
    const overlay = document.getElementById("game-overlay");
    if (overlay) {
      overlay.style.display = "none";
    }
  }

  handleGameError(error) {
    console.error("Game encountered an error:", error);

    // Show user-friendly error message
    const warning = document.getElementById("adblock-warning");
    if (warning) {
      const title = warning.querySelector(".game-warning__title");
      const text = warning.querySelector(".game-warning__text");

      if (title) title.textContent = "Game Error";
      if (text)
        text.textContent =
          "The game encountered an error. Please try refreshing the page or check your internet connection.";

      warning.style.display = "block";
    }
  }

  handleGameLoaded() {
    // Game has finished loading
    this.isGameActive = true;
    this.hideOverlay();

    // Remove loading state
    const wrapper = document.getElementById("game-wrapper");
    if (wrapper) {
      wrapper.classList.remove("loading");
    }
  }

  requestFullscreen() {
    if (this.iframe) {
      this.iframe.requestFullscreen().catch((error) => {
        console.warn("Fullscreen request failed:", error);
      });
    }
  }

  // Public method to send commands to the game
  sendGameCommand(command, data = {}) {
    if (this.iframe && this.iframe.contentWindow) {
      try {
        this.iframe.contentWindow.postMessage(
          {
            type: command,
            data: data,
            source: "parent",
          },
          "*"
        );
      } catch (error) {
        console.warn("Could not send command to game:", error);
      }
    }
  }
}

// Initialize keyboard handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new IframeKeyboardHandler();
});
