// Keyboard Event Handler for iframe content
// This script should be injected into the iframe or included in the game

(function () {
  "use strict";

  // Configuration for keyboard controls
  const KEYBOARD_CONFIG = {
    // Arrow keys
    ArrowUp: { action: "moveUp", keyCode: 38 },
    ArrowDown: { action: "moveDown", keyCode: 40 },
    ArrowLeft: { action: "moveLeft", keyCode: 37 },
    ArrowRight: { action: "moveRight", keyCode: 39 },

    // WASD keys
    KeyW: { action: "moveUp", keyCode: 87 },
    KeyA: { action: "moveLeft", keyCode: 65 },
    KeyS: { action: "moveDown", keyCode: 83 },
    KeyD: { action: "moveRight", keyCode: 68 },

    // Additional game keys
    Space: { action: "jump", keyCode: 32 },
    Enter: { action: "confirm", keyCode: 13 },
    Escape: { action: "pause", keyCode: 27 },
    KeyZ: { action: "action1", keyCode: 90 },
    KeyX: { action: "action2", keyCode: 88 },
    KeyC: { action: "action3", keyCode: 67 },
  };

  // Game control functions
  const gameControls = {
    moveUp: () => {
      console.log("Move Up");
      // Implement game-specific move up logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.moveUp === "function"
      ) {
        window.gameInstance.moveUp();
      }
    },

    moveDown: () => {
      console.log("Move Down");
      // Implement game-specific move down logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.moveDown === "function"
      ) {
        window.gameInstance.moveDown();
      }
    },

    moveLeft: () => {
      console.log("Move Left");
      // Implement game-specific move left logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.moveLeft === "function"
      ) {
        window.gameInstance.moveLeft();
      }
    },

    moveRight: () => {
      console.log("Move Right");
      // Implement game-specific move right logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.moveRight === "function"
      ) {
        window.gameInstance.moveRight();
      }
    },

    jump: () => {
      console.log("Jump");
      // Implement game-specific jump logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.jump === "function"
      ) {
        window.gameInstance.jump();
      }
    },

    confirm: () => {
      console.log("Confirm");
      // Implement game-specific confirm logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.confirm === "function"
      ) {
        window.gameInstance.confirm();
      }
    },

    pause: () => {
      console.log("Pause");
      // Implement game-specific pause logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.pause === "function"
      ) {
        window.gameInstance.pause();
      }
    },

    action1: () => {
      console.log("Action 1");
      // Implement game-specific action1 logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.action1 === "function"
      ) {
        window.gameInstance.action1();
      }
    },

    action2: () => {
      console.log("Action 2");
      // Implement game-specific action2 logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.action2 === "function"
      ) {
        window.gameInstance.action2();
      }
    },

    action3: () => {
      console.log("Action 3");
      // Implement game-specific action3 logic
      if (
        window.gameInstance &&
        typeof window.gameInstance.action3 === "function"
      ) {
        window.gameInstance.action3();
      }
    },
  };

  // Function to handle keyboard events
  function handleKeyboardEvent(eventData) {
    const { eventType, code, key } = eventData;

    // Check if the key is configured
    if (!KEYBOARD_CONFIG[code]) {
      return;
    }

    const config = KEYBOARD_CONFIG[code];
    const controlFunction = gameControls[config.action];

    if (!controlFunction) {
      return;
    }

    // Execute the control function
    if (eventType === "keydown") {
      controlFunction();
    }
    // You can add keyup handling here if needed
  }

  // Listen for postMessage events from parent window
  window.addEventListener("message", function (event) {
    // Verify the message is from our parent window
    if (
      event.origin !== window.location.origin &&
      !event.origin.includes("gamemonetize.co") &&
      !event.origin.includes("localhost")
    ) {
      return;
    }

    const data = event.data;

    // Check if this is a keyboard event message
    if (data && data.type === "keyboardEvent") {
      handleKeyboardEvent(data);
    }
  });

  // Alternative: Direct keyboard event handling (for same-origin iframes)
  document.addEventListener("keydown", function (event) {
    const config = KEYBOARD_CONFIG[event.code];
    if (config) {
      event.preventDefault();
      const controlFunction = gameControls[config.action];
      if (controlFunction) {
        controlFunction();
      }
    }
  });

  // Initialize the keyboard handler
  console.log("Keyboard handler initialized for iframe");

  // Make the handler available globally for debugging
  window.keyboardHandler = {
    gameControls,
    KEYBOARD_CONFIG,
    handleKeyboardEvent,
  };
})();
