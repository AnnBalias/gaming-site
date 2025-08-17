// Main JavaScript file for Friday Night Funkin website

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
  new FridayNightFunkin();
});

class FridayNightFunkin {
  constructor() {
    this.data = null;
    this.init();
  }

  async init() {
    try {
      // Add global error handlers
      this.setupGlobalErrorHandlers();

      await this.loadData();
      this.setupEventListeners();
      this.renderContent();
      this.initializeComponents();
      this.fixNavigation();

      // YYGGames will be initialized after external scripts are loaded
    } catch (error) {
      // Failed to initialize silently
    }
  }

  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      // Check if rejection should be handled silently
      if (event.reason && typeof event.reason === "string") {
        if (window.EnvironmentHelpers?.shouldSilentFail(event.reason)) {
          event.preventDefault();
          return;
        }
      }

      // Handle YYGGames specific errors
      if (
        event.reason &&
        typeof event.reason === "string" &&
        (event.reason.includes("YYGGames") ||
          event.reason.includes("is not a function"))
      ) {
        event.preventDefault();
        return;
      }

      // Silently handle other promise rejections from external scripts
      event.preventDefault();
    });

    // Handle global errors
    window.addEventListener("error", (event) => {
      // Check if error should be handled silently
      const errorMessage = event.message || "";
      const errorFilename = event.filename || "";

      if (
        window.EnvironmentHelpers?.shouldSilentFail(errorMessage) ||
        window.EnvironmentHelpers?.shouldSilentFail(errorFilename)
      ) {
        // Silently handle external script errors
        event.preventDefault();
        return false;
      }

      // Handle YYGGames specific errors
      if (
        errorMessage.includes("YYGGames") ||
        errorMessage.includes("is not a function")
      ) {
        event.preventDefault();
        return false;
      }

      // Handle CSP violations
      if (errorMessage.includes("Content Security Policy")) {
        event.preventDefault();
        return false;
      }

      // Handle AudioContext errors
      if (
        errorMessage.includes("AudioContext") ||
        errorMessage.includes("must be resumed")
      ) {
        event.preventDefault();
        return false;
      }
    });

    // Handle CSP violations
    document.addEventListener("securitypolicyviolation", (event) => {
      // Silently handle CSP violations
      event.preventDefault();
    });
  }

  async loadData() {
    try {
      // Skip backend config endpoint to avoid connection errors
      // Use local data directly

      // Try multiple paths for data.json
      const paths = ["data.json", "./data.json", "/data.json", "../data.json"];

      let response = null;
      let dataLoaded = false;

      for (const path of paths) {
        try {
          // Add timeout to fetch request
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

          response = await fetch(path, {
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            this.data = await response.json();
            dataLoaded = true;
            break;
          }
        } catch (pathError) {
          // Failed to load from path silently
          continue;
        }
      }

      if (!dataLoaded) {
        // Try XMLHttpRequest as fallback
        try {
          this.data = await this.loadDataWithXHR();
        } catch (xhrError) {
          throw new Error("Failed to load data from all methods");
        }
      }
    } catch (error) {
      // Fallback data
      this.data = {
        meta: {
          title: "QuestSagaOnline.com - Rhythmic Music Battle",
          description: "Dive into crazy rhythms and extraordinary duels.",
          keywords:
            "questsagaonline, rhythm game, music game, dance game, battle, music",
        },
        header: {
          logo: {
            text: "QuestSaga",
            accent: "Online",
          },
          navigation: {
            home: "Home",
            game: "Play Now",
            howToPlay: "How to Play",
            news: "News",
            contact: "Contact",
          },
        },
        hero: {
          badge: "New Game",
          title: "QuestSagaOnline.com",
          description: "Dive into crazy rhythms and extraordinary duels.",
          actions: {
            playNow: "Play Now",
            howToPlay: "How to Play",
          },
          features: [
            { icon: "music", text: "Rhythmic Music" },
            { icon: "energy", text: "Fast Duels" },
            { icon: "gamepad", text: "Tournaments" },
          ],
          gamePreview: {
            title: "Preview",
            stats: {
              rating: { value: "4.8", label: "Rating" },
              players: { value: "10K+", label: "Players" },
              songs: { value: "50+", label: "Songs" },
            },
          },
        },
        game: {
          title: "Play Now",
          description: "Click the button to start the game",
          startButton: "Start Game",
        },
        playGame: {
          fullscreenButton: "Fullscreen",
          exitFullscreenButton: "Exit Fullscreen",
          iframe: {
            src: "https://html5.gamemonetize.co/8g62o78s1wjhsiu54xlmql32h7pagsek/",
            width: "720",
            height: "1280",
          },
        },
        howToPlay: {
          title: "How to Play",
          description: "Learn the game rules",
          steps: [
            {
              step: "1",
              title: "Choose a song",
              description: "Select your favorite song from the collection",
            },
            {
              step: "2",
              title: "Press arrows",
              description: "Press arrows in time with the beats",
            },
            {
              step: "3",
              title: "Stay in rhythm",
              description: "Keep the rhythm to score points",
            },
          ],
        },
        reviews: {
          title: "Player Reviews",
          description: "What players say about us",
          reviews: [
            {
              player: "Anna",
              rating: 5,
              comment: "Great game! Very exciting music.",
              avatar: "assets/images/avatar1.jpg",
            },
            {
              player: "Max",
              rating: 4,
              comment: "Good gameplay, but could use more songs.",
              avatar: "assets/images/avatar2.jpg",
            },
          ],
        },
        news: {
          title: "Latest News",
          description:
            "Stay up to date with the latest events and announcements",
          articles: [
            {
              id: 1,
              title: "New song added",
              excerpt: "Added a new exciting song to the collection",
              content:
                "We're excited to announce that a new exciting song has been added to the collection. Try it now!",
              image: "assets/images/post.jpg",
              date: "2025-01-15",
            },
            {
              id: 2,
              title: "Interface update",
              excerpt: "Improved user interface",
              content:
                "We've updated the game interface for a better user experience. Everything looks even better now!",
              image: "assets/images/post2.jpg",
              date: "2025-01-10",
            },
          ],
        },
        contact: {
          title: "Contact Us",
          description: "Have questions? Write to us!",
          info: {
            email: "support@questsagaonline.com",
            address: "123 Gaming Street, Sydney NSW 2000, Australia",
            phone: "+61 2 9123 4567",
          },
          form: {
            name: {
              label: "Name",
              placeholder: "Enter your name",
            },
            email: {
              label: "Email",
              placeholder: "Enter your email",
            },
            message: {
              label: "Message",
              placeholder: "Enter your message",
            },
            submit: "Send",
            sending: "Sending...",
            success: "Message sent successfully!",
            error: "Error sending message.",
          },
        },
        footer: {
          brand: {
            text: "QuestSaga",
            accent: "Online",
          },
          description: "The best rhythmic music game for all age groups.",
          sections: {
            game: {
              title: "Game",
              links: [
                { text: "Play Now", href: "#game" },
                { text: "How to Play", href: "#how-to-play" },
                { text: "Rules", href: "#rules" },
              ],
            },
            community: {
              title: "Community",
              links: [
                {
                  text: "Discord",
                  href: "https://discord.com",
                  external: true,
                },
                {
                  text: "Twitter",
                  href: "https://twitter.com",
                  external: true,
                },
                { text: "Forum", href: "#", external: true },
              ],
            },
            legal: {
              title: "Legal",
              links: [
                { text: "Terms of Service", href: "terms.html" },
                { text: "Privacy Policy", href: "privacy.html" },
                { text: "Cookie Policy", href: "cookies.html" },
              ],
            },
          },
          copyright: "© 2025 QuestSagaOnline.com. All rights reserved.",
        },
        cookieBar: {
          message: "We use cookies to improve your experience.",
          accept: "Accept",
          decline: "Decline",
        },
      };
    }
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector(".header__mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuClose = document.querySelector(".mobile-menu__close");
    const mobileMenuOverlay = document.querySelector(".mobile-menu__overlay");

    if (mobileToggle && mobileMenu) {
      // Open mobile menu
      mobileToggle.addEventListener("click", () => {
        this.openMobileMenu(mobileToggle, mobileMenu);
      });

      // Close mobile menu with close button
      if (mobileMenuClose) {
        mobileMenuClose.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeMobileMenu(mobileToggle, mobileMenu);
        });
      }

      // Close mobile menu when clicking overlay
      if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener("click", () => {
          this.closeMobileMenu(mobileToggle, mobileMenu);
        });
      }

      // Close mobile menu when clicking on links
      const mobileLinks = document.querySelectorAll(".mobile-menu__link");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu(mobileToggle, mobileMenu);
        });
      });

      // Close mobile menu with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
          this.closeMobileMenu(mobileToggle, mobileMenu);
        }
      });
    }

    // Smooth scrolling for anchor links and buttons
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const scrollButtons = document.querySelectorAll(
      "#play-now-btn, #watch-trailer-btn"
    );

    // Function for smooth scrolling
    const smoothScrollTo = (targetId) => {
      try {
        const target = document.querySelector(targetId);
        if (target) {
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      } catch (error) {
        // Fallback to regular scroll
        try {
          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView();
          }
        } catch (fallbackError) {
          // Fallback scroll also failed silently
        }
      }
    };

    // Anchor links
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScrollTo(link.getAttribute("href"));
      });
    });

    // Hero buttons
    scrollButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (button.id === "play-now-btn") {
          smoothScrollTo("#game");
        } else if (button.id === "watch-trailer-btn") {
          smoothScrollTo("#how-to-play");
        }
      });
    });

    // Cookie bar
    this.setupCookieBar();

    // Game iframe
    this.setupGameIframe();

    // News modals
    this.setupNewsModals();

    // Contact form
    this.setupContactForm();

    // Header scroll effect
    this.setupHeaderScroll();

    // Navigation highlighting
    this.setupNavigationHighlighting();
  }

  setupCookieBar() {
    const cookieBar = document.getElementById("cookie-bar");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");

    if (cookieBar && acceptBtn && declineBtn) {
      const cookiesAccepted = localStorage.getItem("cookiesAccepted");

      if (!cookiesAccepted) {
        cookieBar.style.display = "block";
      }

      acceptBtn.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBar.style.display = "none";
      });

      declineBtn.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "false");
        cookieBar.style.display = "none";
      });
    }
  }

  setupGameIframe() {
    const startGameBtn = document.getElementById("start-game-btn");
    const gameOverlay = document.getElementById("game-overlay");
    const gameIframe = document.getElementById("game-iframe");
    const gameWrapper = document.getElementById("game-wrapper");
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    const fullscreenBtnText = document.getElementById("fullscreen-btn-text");

    // Initialize AudioContext after user gesture
    let audioContext = null;
    let audioContextInitialized = false;

    const initializeAudioContext = () => {
      if (audioContextInitialized) return;

      try {
        if (window.AudioContext || window.webkitAudioContext) {
          const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContextClass();

          if (audioContext.state === "suspended") {
            audioContext
              .resume()
              .then(() => {
                window.gameAudioContext = audioContext;
                audioContextInitialized = true;
              })
              .catch(() => {
                // AudioContext resume failed silently
              });
          } else {
            window.gameAudioContext = audioContext;
            audioContextInitialized = true;
          }
        }
      } catch (error) {
        // AudioContext creation failed silently
      }
    };

    // Initialize AudioContext on first user interaction
    document.addEventListener("click", initializeAudioContext, { once: true });
    document.addEventListener("keydown", initializeAudioContext, {
      once: true,
    });

    if (startGameBtn && gameOverlay && gameIframe) {
      startGameBtn.addEventListener("click", async () => {
        // Initialize AudioContext on game start
        initializeAudioContext();

        // The iframe is already loaded with the game URL
        // Just hide the overlay to reveal the game
        gameOverlay.style.display = "none";

        // Focus the iframe for better user experience
        gameIframe.focus();

        // Optional: Add a class to indicate the game is active
        gameIframe.classList.add("game-active");
      });
    }

    // Fullscreen functionality
    if (fullscreenBtn && gameWrapper && fullscreenBtnText) {
      fullscreenBtn.addEventListener("click", () => {
        this.toggleFullscreen(gameWrapper, fullscreenBtnText);
      });
    }

    // Listen for fullscreen changes
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        // Exited fullscreen
        gameWrapper.classList.remove("fullscreen");
        if (fullscreenBtnText && this.data.playGame) {
          fullscreenBtnText.textContent = this.data.playGame.fullscreenButton;
        }
      } else {
        // Entered fullscreen
        if (fullscreenBtnText && this.data.playGame) {
          fullscreenBtnText.textContent =
            this.data.playGame.exitFullscreenButton;
        }
      }
    });

    // Handle iframe load errors
    if (gameIframe) {
      gameIframe.addEventListener("load", () => {
        // Iframe loaded successfully
        gameIframe.classList.add("loaded");

        // Add comprehensive error handling for iframe
        try {
          if (gameIframe.contentWindow) {
            // Add error handler for game window
            gameIframe.contentWindow.addEventListener("error", (e) => {
              // Silently handle game errors
              e.preventDefault();
              return false;
            });

            // Add unhandledrejection handler for iframe
            gameIframe.contentWindow.addEventListener(
              "unhandledrejection",
              (e) => {
                // Silently handle promise rejections
                e.preventDefault();
              }
            );

            // Disable YYGGames initialization to prevent errors
            // The game will handle its own initialization
          }
        } catch (error) {
          // Cross-origin error - ignore silently
        }
      });

      gameIframe.addEventListener("error", () => {
        // Handle iframe loading errors silently
      });

      // Handle sandbox errors
      gameIframe.addEventListener("securitypolicyviolation", (e) => {
        // Silently handle sandbox policy violations
        e.preventDefault();
      });
    }

    // Setup keyboard controls for the game
    this.setupKeyboardControls(gameIframe);
  }

  setupKeyboardControls(gameIframe) {
    if (!gameIframe) return;

    // List of keys to redirect to iframe
    const gameKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "KeyW",
      "KeyA",
      "KeyS",
      "KeyD", // WASD
      "Space",
      "Enter",
      "Escape",
      "KeyZ", // Additional game keys
      "KeyX",
      "KeyC",
    ];

    // Function to focus iframe
    const focusIframe = () => {
      try {
        if (gameIframe.contentWindow) {
          gameIframe.contentWindow.focus();
        }
      } catch (error) {
        // Focus failed silently
      }
    };

    // Function to send event via postMessage
    const sendKeyboardEvent = (eventType, event) => {
      try {
        // Send event via postMessage
        gameIframe.contentWindow.postMessage(
          {
            type: "keyboardEvent",
            eventType: eventType,
            key: event.key,
            code: event.code,
            keyCode: event.keyCode,
            which: event.which,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            metaKey: event.metaKey,
            timestamp: Date.now(),
          },
          "*"
        );
      } catch (error) {
        // PostMessage failed silently
      }
    };

    // Focus iframe when clicking on it
    gameIframe.addEventListener("click", focusIframe);

    // Handle key press
    document.addEventListener("keydown", (e) => {
      // Check if iframe is active and if it's a game key
      if (
        gameIframe.classList.contains("game-active") &&
        gameKeys.includes(e.code)
      ) {
        // Check if user is not typing in a form
        const activeElement = document.activeElement;
        const isTypingInForm =
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.tagName === "SELECT" ||
            activeElement.contentEditable === "true");

        // If user is typing in a form, don't block keys
        if (isTypingInForm) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        // Focus iframe before sending event
        focusIframe();

        // Send event via postMessage
        sendKeyboardEvent("keydown", e);
      }
    });

    // Handle key release
    document.addEventListener("keyup", (e) => {
      if (
        gameIframe.classList.contains("game-active") &&
        gameKeys.includes(e.code)
      ) {
        // Check if user is not typing in a form
        const activeElement = document.activeElement;
        const isTypingInForm =
          activeElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.tagName === "SELECT" ||
            activeElement.contentEditable === "true");

        // If user is typing in a form, don't block keys
        if (isTypingInForm) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        // Send event via postMessage
        sendKeyboardEvent("keyup", e);
      }
    });

    // Add handler for automatic focusing when game loads
    gameIframe.addEventListener("load", () => {
      setTimeout(focusIframe, 1000); // Focus after 1 second of loading
    });
  }

  toggleFullscreen(wrapper, btnText) {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      wrapper
        .requestFullscreen()
        .then(() => {
          wrapper.classList.add("fullscreen");
          if (btnText && this.data.playGame) {
            btnText.textContent = this.data.playGame.exitFullscreenButton;
          }
        })
        .catch((err) => {
          // Fullscreen entry failed silently
        });
    } else {
      // Exit fullscreen
      document
        .exitFullscreen()
        .then(() => {
          wrapper.classList.remove("fullscreen");
          if (btnText && this.data.playGame) {
            btnText.textContent = this.data.playGame.fullscreenButton;
          }
        })
        .catch((err) => {
          // Fullscreen exit failed silently
        });
    }
  }

  setupNewsModals() {
    const newsGrid = document.getElementById("news-grid");
    const modal = document.getElementById("news-modal");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");

    if (newsGrid && modal && modalOverlay && modalClose) {
      // Close modal when clicking overlay or close button
      modalOverlay.addEventListener("click", () => this.closeModal());
      modalClose.addEventListener("click", () => this.closeModal());

      // Close modal with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      });
    }
  }

  setupContactForm() {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleContactForm(e.target);
      });

      // Add handlers for autocomplete
      const inputs = contactForm.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        // Handler for detecting autocomplete
        input.addEventListener("animationstart", (e) => {
          if (e.animationName === "onAutoFillStart") {
            input.classList.add("autofilled");
          }
        });

        // Handler for value change
        input.addEventListener("input", () => {
          if (input.value) {
            input.classList.add("has-value");
          } else {
            input.classList.remove("has-value");
          }

          // Clear validation states on input
          input.classList.remove("error", "invalid", "valid");
        });

        // Handler for focus
        input.addEventListener("focus", () => {
          input.classList.add("focused");
        });

        // Handler for blur
        input.addEventListener("blur", () => {
          input.classList.remove("focused");
        });
      });
    }
  }

  setupHeaderScroll() {
    const header = document.querySelector(".header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }

      lastScrollY = currentScrollY;
    });
  }

  setupNavigationHighlighting() {
    const navLinks = document.querySelectorAll(".nav__link");
    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header height

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          // Remove active class from all links
          navLinks.forEach((link) => link.classList.remove("active"));

          // Add active class to corresponding link
          const activeLink = document.querySelector(
            `.nav__link[href="#${sectionId}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    };

    // Update on scroll
    window.addEventListener("scroll", updateActiveNav);

    // Update on page load
    updateActiveNav();
  }

  renderContent() {
    if (!this.data) return;

    // Update meta tags
    this.updateMetaTags();

    // Render header
    this.renderHeader();

    // Render hero section
    this.renderHero();

    // Render game section
    this.renderGame();

    // Render how to play steps
    this.renderHowToPlay();

    // Render reviews
    this.renderReviews();

    // Render news
    this.renderNews();

    // Render disclaimer
    this.renderDisclaimer();

    // Render contact info
    this.renderContact();

    // Render footer
    this.renderFooter();

    // Render cookie bar
    this.renderCookieBar();
  }

  updateMetaTags() {
    if (!this.data.meta) return;

    // Update title
    document.title = this.data.meta.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", this.data.meta.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", this.data.meta.keywords);
    }
  }

  renderHeader() {
    if (!this.data.header) return;

    // Update logo
    const logoText = document.querySelector(".logo__text");
    const logoAccent = document.querySelector(".logo__accent");

    if (logoText && this.data.header.logo) {
      logoText.textContent = this.data.header.logo.text;
    }
    if (logoAccent && this.data.header.logo) {
      logoAccent.textContent = this.data.header.logo.accent;
    }

    // Update navigation links
    const navLinks = document.querySelectorAll(".nav__link");
    const mobileNavLinks = document.querySelectorAll(".mobile-menu__link");

    if (this.data.header.navigation) {
      const nav = this.data.header.navigation;

      // Update desktop navigation
      navLinks.forEach((link, index) => {
        const keys = Object.keys(nav);
        if (keys[index]) {
          link.textContent = nav[keys[index]];
        }
      });

      // Update mobile navigation
      mobileNavLinks.forEach((link, index) => {
        const keys = Object.keys(nav);
        if (keys[index]) {
          link.textContent = nav[keys[index]];
        }
      });
    }
  }

  renderHero() {
    if (!this.data.hero) return;

    const heroBadge = document.querySelector(".hero__badge-text");
    const heroTitle = document.getElementById("hero-title");
    const heroDescription = document.getElementById("hero-description");
    const playNowBtn = document.getElementById("play-now-btn");
    const watchTrailerBtn = document.getElementById("watch-trailer-btn");

    if (heroBadge) {
      // Рендеримо hero badge з SVG іконкою
      heroBadge.innerHTML = `
        <svg class="icon icon--music" aria-hidden="true">
          <use href="#music"></use>
        </svg>
        ${this.data.hero.badge}
      `;
    }
    if (heroTitle) heroTitle.textContent = this.data.hero.title;
    if (heroDescription)
      heroDescription.textContent = this.data.hero.description;

    if (playNowBtn && this.data.hero.actions) {
      playNowBtn.querySelector(".btn__text").textContent =
        this.data.hero.actions.playNow;
    }

    if (watchTrailerBtn && this.data.hero.actions) {
      watchTrailerBtn.querySelector(".btn__text").textContent =
        this.data.hero.actions.howToPlay;
    }

    // Render hero features
    this.renderHeroFeatures();

    // Render game preview
    this.renderGamePreview();
  }

  renderHeroFeatures() {
    if (!this.data.hero?.features) return;

    const featuresContainer = document.querySelector(".hero__features");
    if (!featuresContainer) return;

    featuresContainer.innerHTML = this.data.hero.features
      .map(
        (feature) => `
        <div class="hero__feature">
          <span class="hero__feature-icon">
            <svg class="icon icon--${feature.icon}" aria-hidden="true">
              <use href="#${feature.icon}"></use>
            </svg>
          </span>
          <span class="hero__feature-text">${feature.text}</span>
        </div>
      `
      )
      .join("");
  }

  renderGamePreview() {
    if (!this.data.hero?.gamePreview) return;

    const previewTitle = document.querySelector(".game-preview__title");

    if (previewTitle)
      previewTitle.textContent = this.data.hero.gamePreview.title;

    // Update stats
    if (this.data.hero.gamePreview.stats) {
      const stats = this.data.hero.gamePreview.stats;

      const ratingValue = document.querySelector(
        ".game-preview__stat:nth-child(1) .stat__value"
      );
      const ratingLabel = document.querySelector(
        ".game-preview__stat:nth-child(1) .stat__label"
      );
      const playersValue = document.querySelector(
        ".game-preview__stat:nth-child(2) .stat__value"
      );
      const playersLabel = document.querySelector(
        ".game-preview__stat:nth-child(2) .stat__label"
      );
      const songsValue = document.querySelector(
        ".game-preview__stat:nth-child(3) .stat__value"
      );
      const songsLabel = document.querySelector(
        ".game-preview__stat:nth-child(3) .stat__label"
      );

      if (ratingValue && stats.rating)
        ratingValue.textContent = stats.rating.value;
      if (ratingLabel && stats.rating)
        ratingLabel.textContent = stats.rating.label;
      if (playersValue && stats.players)
        playersValue.textContent = stats.players.value;
      if (playersLabel && stats.players)
        playersLabel.textContent = stats.players.label;
      if (songsValue && stats.songs) songsValue.textContent = stats.songs.value;
      if (songsLabel && stats.songs) songsLabel.textContent = stats.songs.label;
    }
  }

  renderGame() {
    if (!this.data.game) return;

    const gameTitle = document.querySelector(".game__title");
    const gameDescription = document.querySelector(".game__description");
    const startGameBtn = document.getElementById("start-game-btn");
    const gameIframe = document.getElementById("game-iframe");
    const fullscreenBtnText = document.getElementById("fullscreen-btn-text");

    if (gameTitle) gameTitle.textContent = this.data.game.title;
    if (gameDescription)
      gameDescription.textContent = this.data.game.description;
    if (startGameBtn) startGameBtn.textContent = this.data.game.startButton;

    // Update fullscreen button text
    if (fullscreenBtnText && this.data.playGame) {
      fullscreenBtnText.textContent = this.data.playGame.fullscreenButton;
    }

    // Update iframe with new game URL if available
    if (gameIframe && this.data.playGame?.iframe) {
      gameIframe.src = this.data.playGame.iframe.src;
    }
  }

  renderHowToPlay() {
    if (!this.data.howToPlay) return;

    const howToPlayTitle = document.getElementById("how-to-play-title");
    const howToPlayDescription = document.querySelector(
      ".how-to-play .section-description"
    );
    const stepsContainer = document.getElementById("steps-container");

    if (howToPlayTitle) howToPlayTitle.textContent = this.data.howToPlay.title;
    if (howToPlayDescription)
      howToPlayDescription.textContent = this.data.howToPlay.description;

    if (stepsContainer && this.data.howToPlay.steps) {
      stepsContainer.innerHTML = this.data.howToPlay.steps
        .map(
          (step) => `
          <div class="step-card">
            <div class="step-card__number">${step.step}</div>
            <div class="step-card__content">
              <h3 class="step-card__title">${step.title}</h3>
              <p class="step-card__description">${step.description}</p>
            </div>
          </div>
        `
        )
        .join("");
    }
  }

  renderReviews() {
    if (!this.data.reviews) return;

    const reviewsTitle = document.getElementById("reviews-title");
    const reviewsDescription = document.querySelector(
      ".reviews .section-description"
    );
    const reviewsGrid = document.getElementById("reviews-grid");

    if (reviewsTitle) reviewsTitle.textContent = this.data.reviews.title;
    if (reviewsDescription)
      reviewsDescription.textContent = this.data.reviews.description;

    if (reviewsGrid && this.data.reviews.reviews) {
      reviewsGrid.innerHTML = this.data.reviews.reviews
        .map(
          (review) => `
          <div class="review-card">
            <div class="review-card__header">
              <img src="${review.avatar}" alt="${
            review.player
          }" class="review-card__avatar" />
              <div class="review-card__info">
                <h4 class="review-card__player">${review.player}</h4>
                <div class="review-card__rating">
                  ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <p class="review-card__comment">${review.comment}</p>
          </div>
        `
        )
        .join("");
    }
  }

  renderNews() {
    if (!this.data.news) {
      return;
    }

    const newsTitle = document.getElementById("news-title");
    const newsDescription = document.querySelector(
      ".news .section-description"
    );
    const newsGrid = document.getElementById("news-grid");

    if (newsTitle) newsTitle.textContent = this.data.news.title;
    if (newsDescription)
      newsDescription.textContent = this.data.news.description;

    if (newsGrid && this.data.news.articles) {
      newsGrid.innerHTML = this.data.news.articles
        .map(
          (article) => `
          <div class="news-card" data-article-id="${article.id}">
            <div class="news-card__image">
              <img src="${article.image}" alt="${article.title}" />
            </div>
            <div class="news-card__content">
              <h3 class="news-card__title">${article.title}</h3>
              <p class="news-card__excerpt">${article.excerpt}</p>
              <div class="news-card__meta">
                              <span class="news-card__date">${new Date(
                                article.date
                              ).toLocaleDateString("en-US")}</span>
              <button class="btn btn--ghost news-card__read-more">Read More</button>
              </div>
            </div>
          </div>
        `
        )
        .join("");

      // Add click handlers for news cards
      const newsCards = document.querySelectorAll(".news-card");
      newsCards.forEach((card) => {
        card.addEventListener("click", () => {
          const articleId = card.dataset.articleId;
          this.openNewsModal(articleId);
        });
      });
    }
  }

  renderDisclaimer() {
    if (!this.data.disclaimer) return;

    const disclaimerTitle = document.querySelector(".disclaimer__title");
    const disclaimerDescription = document.querySelector(
      ".disclaimer__description"
    );
    const disclaimerContent = document.querySelector(".disclaimer-content");

    if (disclaimerTitle)
      disclaimerTitle.textContent = this.data.disclaimer.title;
    if (disclaimerDescription)
      disclaimerDescription.textContent = this.data.disclaimer.description;

    if (disclaimerContent && this.data.disclaimer.blocks) {
      disclaimerContent.innerHTML = this.data.disclaimer.blocks
        .map(
          (block) => `
          <div class="disclaimer-block">
            <h3>${block.title}</h3>
            <p>${block.content}</p>
          </div>
        `
        )
        .join("");
    }
  }

  renderContact() {
    if (!this.data.contact) {
      return;
    }

    const contactTitle = document.getElementById("contact-title");
    const contactDescription = document.querySelector(
      ".contact .section-description"
    );
    const contactEmail = document.getElementById("contact-email");

    if (contactTitle) {
      contactTitle.textContent = this.data.contact.title;
    }
    if (contactDescription) {
      contactDescription.textContent = this.data.contact.description;
    }

    if (contactEmail && this.data.contact.info) {
      contactEmail.href = `mailto:${this.data.contact.info.email}`;
      contactEmail.textContent = this.data.contact.info.email;
    }

    // Update address
    const contactAddress = document.getElementById("contact-address");
    if (contactAddress && this.data.contact.info?.address) {
      contactAddress.textContent = this.data.contact.info.address;
    }

    // Update form labels and placeholders
    this.updateContactForm();
  }

  updateContactForm() {
    if (!this.data.contact?.form) {
      return;
    }

    const form = this.data.contact.form;

    // Update name field
    const nameLabel = document.querySelector('label[for="contact-name"]');
    const nameInput = document.getElementById("contact-name");
    if (nameLabel) {
      nameLabel.textContent = form.name.label;
    }
    if (nameInput) {
      nameInput.placeholder = form.name.placeholder;
    }

    // Update email field
    const emailLabel = document.querySelector(
      'label[for="contact-email-input"]'
    );
    const emailInput = document.getElementById("contact-email-input");
    if (emailLabel) {
      emailLabel.textContent = form.email.label;
    }
    if (emailInput) {
      emailInput.placeholder = form.email.placeholder;
    }

    // Update message field
    const messageLabel = document.querySelector('label[for="contact-message"]');
    const messageInput = document.getElementById("contact-message");
    if (messageLabel) {
      messageLabel.textContent = form.message.label;
    }
    if (messageInput) {
      messageInput.placeholder = form.message.placeholder;
    }

    // Update submit button
    const submitBtn = document.querySelector(
      ".contact-form .btn--primary .btn__text"
    );
    if (submitBtn) {
      submitBtn.textContent = form.submit;
    }
  }

  renderFooter() {
    if (!this.data.footer) return;

    // Update logo
    const footerLogoText = document.querySelector(".footer__logo .logo__text");
    const footerLogoAccent = document.querySelector(
      ".footer__logo .logo__accent"
    );

    if (footerLogoText && this.data.footer.brand) {
      footerLogoText.textContent = this.data.footer.brand.text;
    }
    if (footerLogoAccent && this.data.footer.brand) {
      footerLogoAccent.textContent = this.data.footer.brand.accent;
    }

    // Update description
    const footerDescription = document.querySelector(".footer__description");
    if (footerDescription)
      footerDescription.textContent = this.data.footer.description;

    // Update footer sections
    this.updateFooterSections();

    // Update copyright
    const footerCopyright = document.getElementById("footer-copyright");
    if (footerCopyright)
      footerCopyright.textContent = this.data.footer.copyright;
  }

  updateFooterSections() {
    if (!this.data.footer?.sections) return;

    const sections = this.data.footer.sections;

    // Update Game section
    if (sections.game) {
      const gameTitle = document.querySelector(
        ".footer__section:nth-child(1) .footer__title"
      );
      if (gameTitle) gameTitle.textContent = sections.game.title;

      const gameLinks = document.querySelectorAll(
        ".footer__section:nth-child(1) .footer__link"
      );
      sections.game.links.forEach((link, index) => {
        if (gameLinks[index]) {
          gameLinks[index].textContent = link.text;
          gameLinks[index].href = link.href;
        }
      });
    }

    // Update Community section
    if (sections.community) {
      const communityTitle = document.querySelector(
        ".footer__section:nth-child(2) .footer__title"
      );
      if (communityTitle) communityTitle.textContent = sections.community.title;

      const communityLinks = document.querySelectorAll(
        ".footer__section:nth-child(2) .footer__link"
      );
      sections.community.links.forEach((link, index) => {
        if (communityLinks[index]) {
          communityLinks[index].textContent = link.text;
          communityLinks[index].href = link.href;
          if (link.external) {
            communityLinks[index].target = "_blank";
            communityLinks[index].rel = "noopener";
          }
        }
      });
    }

    // Update Legal section
    if (sections.legal) {
      const legalTitle = document.querySelector(
        ".footer__section:nth-child(3) .footer__title"
      );
      if (legalTitle) legalTitle.textContent = sections.legal.title;

      const legalLinks = document.querySelectorAll(
        ".footer__section:nth-child(3) .footer__link"
      );
      sections.legal.links.forEach((link, index) => {
        if (legalLinks[index]) {
          legalLinks[index].textContent = link.text;
          legalLinks[index].href = link.href;
        }
      });
    }
  }

  renderCookieBar() {
    if (!this.data.cookieBar) return;

    const cookieMessage = document.getElementById("cookie-message");
    const cookieAccept = document.getElementById("cookie-accept");
    const cookieDecline = document.getElementById("cookie-decline");

    if (cookieMessage) cookieMessage.textContent = this.data.cookieBar.message;
    if (cookieAccept) cookieAccept.textContent = this.data.cookieBar.accept;
    if (cookieDecline) cookieDecline.textContent = this.data.cookieBar.decline;
  }

  openNewsModal(articleId) {
    const article = this.data.news.articles.find((a) => a.id == articleId);
    if (!article) return;

    const modal = document.getElementById("news-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDate = document.getElementById("modal-date");
    const modalBody = document.getElementById("modal-body");

    if (modal && modalTitle && modalImage && modalDate && modalBody) {
      modalTitle.textContent = article.title;
      modalImage.src = article.image;
      modalImage.alt = article.title;
      modalDate.textContent = new Date(article.date).toLocaleDateString(
        "en-US"
      );
      modalBody.textContent = article.content;

      modal.classList.add("active");
      document.body.classList.add("modal-open");
    }
  }

  closeModal() {
    const modal = document.getElementById("news-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  }

  async handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Form data processed

    // Clear previous validation states
    this.clearValidationStates(form);

    // Data validation
    const errors = [];
    const nameInput = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email-input");
    const messageInput = form.querySelector("#contact-message");

    if (!data.name || data.name.trim().length < 2) {
      errors.push("Name must contain at least 2 characters");
      if (nameInput) {
        nameInput.classList.add("error");
        nameInput.classList.remove("valid");
      }
    } else if (nameInput) {
      nameInput.classList.add("valid");
      nameInput.classList.remove("error");
    }

    if (!data.email || !data.email.includes("@")) {
      errors.push("Please enter a valid email");
      if (emailInput) {
        emailInput.classList.add("error");
        emailInput.classList.remove("valid");
      }
    } else if (emailInput) {
      emailInput.classList.add("valid");
      emailInput.classList.remove("error");
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.push("Message must contain at least 10 characters");
      if (messageInput) {
        messageInput.classList.add("error");
        messageInput.classList.remove("valid");
      }
    } else if (messageInput) {
      messageInput.classList.add("valid");
      messageInput.classList.remove("error");
    }

    if (errors.length > 0) {
      alert("Validation errors:\n" + errors.join("\n"));
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector(".form__submit");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span class="btn__text">${this.data.contact.form.sending}</span><span class="btn__icon">📤</span>`;
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert(this.data.contact.form.success);
      form.reset();
    } catch (error) {
      alert(this.data.contact.form.error);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  clearValidationStates(form) {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.classList.remove("error", "invalid", "valid");
    });
  }

  openMobileMenu(mobileToggle, mobileMenu) {
    try {
      // Store current scroll position
      const scrollY = window.scrollY;

      mobileToggle.classList.add("active");
      mobileMenu.classList.add("active");
      document.body.classList.add("menu-open");

      // Prevent scrolling without visual jump
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Store scroll position for restoration
      document.body.dataset.scrollY = scrollY;
    } catch (error) {
      // Failed to open mobile menu silently
    }
  }

  closeMobileMenu(mobileToggle, mobileMenu) {
    try {
      mobileToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");

      // Restore scroll position
      const scrollY = document.body.dataset.scrollY;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        delete document.body.dataset.scrollY;
      }
    } catch (error) {
      // Failed to close mobile menu silently
    }
  }

  loadDataWithXHR() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "data.json", true);
      xhr.timeout = 5000;

      xhr.onload = function () {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (parseError) {
            reject(new Error("Failed to parse JSON: " + parseError.message));
          }
        } else {
          reject(new Error("XHR failed with status: " + xhr.status));
        }
      };

      xhr.onerror = function () {
        reject(new Error("XHR request failed"));
      };

      xhr.ontimeout = function () {
        reject(new Error("XHR request timed out"));
      };

      xhr.send();
    });
  }

  initializeComponents() {
    // Add any additional component initialization here
    this.loadExternalScriptsSafely();
  }

  loadExternalScriptsSafely() {
    // Skip external scripts to prevent errors
    // The game will handle its own SDK initialization
  }

  initializeYYGGames() {
    // Skip YYGGames initialization to prevent errors
    // The game will handle its own SDK initialization
  }

  fixNavigation() {
    // Fix navigation based on current page
    const currentPage = window.location.pathname;

    // Get all navigation links
    const newsLinks = document.querySelectorAll(
      'a[href="./news.html"], a[href="news.html"]'
    );
    const homeLinks = document.querySelectorAll(
      'a[href="./"], a[href="#news"]'
    );

    if (currentPage.includes("news.html")) {
      // On news page - change "News" links to point to home page
      newsLinks.forEach((link) => {
        link.href = "./";
        link.textContent = "Home";
      });

      // Change "#news" links to point to home page
      homeLinks.forEach((link) => {
        if (link.href.includes("#news")) {
          link.href = "./";
        }
      });
    } else {
      // On home page - ensure "News" links point to news page
      newsLinks.forEach((link) => {
        link.href = "./news.html";
        link.textContent = "News";
      });
    }
  }
}
