// Iframe Keyboard Handler for Game Controls
// This script runs inside the iframe to handle keyboard events from parent window

(function() {
  'use strict';

  // Configuration for keyboard controls
  const KEYBOARD_CONFIG = {
    'ArrowUp': 'up',
    'ArrowDown': 'down', 
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'KeyW': 'up',
    'KeyS': 'down',
    'KeyA': 'left',
    'KeyD': 'right',
    'Space': 'space',
    'Enter': 'enter',
    'Escape': 'escape',
    'KeyZ': 'z',
    'KeyX': 'x',
    'KeyC': 'c'
  };

  // Game control functions
  const gameControls = {
    up: () => {
      try {
        // Simulate up arrow key press
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp', code: 'ArrowUp' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    down: () => {
      try {
        // Simulate down arrow key press
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    left: () => {
      try {
        // Simulate left arrow key press
        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', code: 'ArrowLeft' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    right: () => {
      try {
        // Simulate right arrow key press
        const event = new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    space: () => {
      try {
        // Simulate space key press
        const event = new KeyboardEvent('keydown', { key: ' ', code: 'Space' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    enter: () => {
      try {
        // Simulate enter key press
        const event = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    escape: () => {
      try {
        // Simulate escape key press
        const event = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    z: () => {
      try {
        // Simulate Z key press
        const event = new KeyboardEvent('keydown', { key: 'z', code: 'KeyZ' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    x: () => {
      try {
        // Simulate X key press
        const event = new KeyboardEvent('keydown', { key: 'x', code: 'KeyX' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    },
    c: () => {
      try {
        // Simulate C key press
        const event = new KeyboardEvent('keydown', { key: 'c', code: 'KeyC' });
        document.dispatchEvent(event);
      } catch (error) {
        // Handle error silently
      }
    }
  };

  // Handle keyboard events from parent window
  function handleKeyboardEvent(eventData) {
    try {
      const { eventType, code } = eventData;
      
      if (!code || !KEYBOARD_CONFIG[code]) {
        return;
      }

      const action = KEYBOARD_CONFIG[code];
      const controlFunction = gameControls[action];

      if (controlFunction && typeof controlFunction === 'function') {
        if (eventType === 'keydown') {
          controlFunction();
        }
        // Handle keyup if needed
      }
    } catch (error) {
      // Handle any errors silently
    }
  }

  // Listen for messages from parent window
  try {
    window.addEventListener('message', function(event) {
      try {
        // Validate message origin for security
        if (event.origin !== window.location.origin && 
            !event.origin.includes('gamemonetize.co')) {
          return;
        }

        const { type, eventType, code } = event.data;

        if (type === 'keyboardEvent' && eventType && code) {
          handleKeyboardEvent({ eventType, code });
        }
      } catch (error) {
        // Handle message processing errors silently
      }
    });
  } catch (error) {
    // Handle event listener errors silently
  }

  // Initialize iframe when ready
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Iframe is ready
        console.log('Iframe keyboard handler initialized');
      });
    } else {
      // Iframe is already loaded
      console.log('Iframe keyboard handler initialized');
    }
  } catch (error) {
    // Handle initialization errors silently
  }

})();
