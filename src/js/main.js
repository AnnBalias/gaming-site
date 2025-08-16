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
    } catch (error) {
      // Failed to initialize silently
    }
  }

  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      // Check if rejection is from external sources
      if (event.reason && typeof event.reason === "string") {
        if (
          event.reason.includes("gamemonetize") ||
          event.reason.includes("YYGGames") ||
          event.reason.includes("cocos2d") ||
          event.reason.includes("about:blank")
        ) {
          event.preventDefault();
          return;
        }
      }
      // Silently handle other promise rejections from external scripts
      event.preventDefault();
    });

    // Handle global errors
    window.addEventListener("error", (event) => {
      // Check if error is from external sources (like game iframe)
      if (
        event.filename &&
        (event.filename.includes("gamemonetize") ||
          event.filename.includes("YYGGames") ||
          event.filename.includes("cocos2d") ||
          event.filename.includes("sdk.js") ||
          event.filename.includes("index.js") ||
          event.filename.includes("about:blank"))
      ) {
        // Silently handle external script errors
        event.preventDefault();
        return false;
      }

      // Handle YYGGames specific errors
      if (event.message && event.message.includes("YYGGames")) {
        event.preventDefault();
        return false;
      }
    });
  }

  async loadData() {
    try {
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
          title: "CyberStrike Arena - Ритмічна музична битва",
          description: "Пориньте у божевільні ритми та надзвичайні дуелі.",
          keywords:
            "cyberstrike arena, ритм гра, музична гра, танцювальна гра, битва, музика",
        },
        header: {
          logo: {
            text: "CyberStrike",
            accent: "Arena",
          },
          navigation: {
            home: "Головна",
            game: "Грати зараз",
            howToPlay: "Як грати",
            news: "Новини",
            contact: "Контакти",
          },
        },
        hero: {
          badge: "🎮 Нова гра",
          title: "CyberStrike Arena",
          description: "Пориньте у божевільні ритми та надзвичайні дуелі.",
          actions: {
            playNow: "Грати зараз",
            howToPlay: "Як грати",
          },
          features: [
            { icon: "🎵", text: "Ритмічна музика" },
            { icon: "⚡", text: "Швидкі дуелі" },
            { icon: "🏆", text: "Турніри" },
          ],
          gamePreview: {
            title: "Попередній перегляд",
            stats: {
              rating: { value: "4.8", label: "Рейтинг" },
              players: { value: "10K+", label: "Гравців" },
              songs: { value: "50+", label: "Пісень" },
            },
          },
        },
        game: {
          title: "Грати зараз",
          description: "Натисніть кнопку, щоб почати гру",
          startButton: "Почати гру",
        },
        playGame: {
          fullscreenButton: "Повноекранний режим",
          exitFullscreenButton: "Згорнути",
          iframe: {
            src: "https://html5.gamemonetize.co/8g62o78s1wjhsiu54xlmql32h7pagsek/",
            width: "720",
            height: "1280",
          },
        },
        howToPlay: {
          title: "Як грати",
          description: "Ознайомтеся з правилами гри",
          steps: [
            {
              step: "1",
              title: "Вибирайте пісню",
              description: "Оберіть улюблену пісню з колекції",
            },
            {
              step: "2",
              title: "Натискайте стрілки",
              description: "Натискайте стрілки в такт з битами",
            },
            {
              step: "3",
              title: "Залишайтесь в ритмі",
              description: "Тримайте ритм, щоб набрати бали",
            },
          ],
        },
        reviews: {
          title: "Відгуки гравців",
          description: "Що говорять про нас гравці",
          reviews: [
            {
              player: "Анна",
              rating: 5,
              comment: "Чудова гра! Дуже захоплююча музика.",
              avatar: "assets/images/avatar1.jpg",
            },
            {
              player: "Максим",
              rating: 4,
              comment: "Гарний геймплей, але можна більше пісень.",
              avatar: "assets/images/avatar2.jpg",
            },
          ],
        },
        news: {
          title: "Останні новини",
          description: "Будьте в курсі останніх подій та анонсів",
          articles: [
            {
              id: 1,
              title: "Нова пісня додана",
              excerpt: "Додано нову захоплюючу пісню до колекції",
              content:
                "Ми раді повідомити, що до колекції додано нову захоплюючу пісню. Спробуйте її прямо зараз!",
              image: "assets/images/post.jpg",
              date: "2025-01-15",
            },
            {
              id: 2,
              title: "Оновлення інтерфейсу",
              excerpt: "Покращений користувацький інтерфейс",
              content:
                "Ми оновили інтерфейс гри для кращого досвіду користувача. Тепер все виглядає ще краще!",
              image: "assets/images/post2.jpg",
              date: "2025-01-10",
            },
          ],
        },
        contact: {
          title: "Зв'яжіться з нами",
          description: "Маєте питання? Напишіть нам!",
          info: {
            email: "support@cyberstrikearena.com",
            address: "м. Київ, вул. Вигадана, 123",
          },
          form: {
            name: {
              label: "Ім'я",
              placeholder: "Введіть ваше ім'я",
            },
            email: {
              label: "Email",
              placeholder: "Введіть ваш email",
            },
            message: {
              label: "Повідомлення",
              placeholder: "Введіть ваше повідомлення",
            },
            submit: "Надіслати",
            sending: "Надсилання...",
            success: "Повідомлення успішно надіслано!",
            error: "Помилка при надсиланні повідомлення.",
          },
        },
        footer: {
          brand: {
            text: "CyberStrike",
            accent: "Arena",
          },
          description: "Найкраща ритмічна музична гра для всіх вікових груп.",
          sections: {
            game: {
              title: "Гра",
              links: [
                { text: "Грати зараз", href: "#game" },
                { text: "Як грати", href: "#how-to-play" },
                { text: "Правила", href: "#rules" },
              ],
            },
            community: {
              title: "Спільнота",
              links: [
                { text: "Discord", href: "#", external: true },
                { text: "Telegram", href: "#", external: true },
                { text: "Форум", href: "#", external: true },
              ],
            },
            legal: {
              title: "Правові питання",
              links: [
                { text: "Умови використання", href: "terms.html" },
                { text: "Політика конфіденційності", href: "privacy.html" },
                { text: "Файли cookie", href: "cookies.html" },
              ],
            },
          },
          copyright: "© 2025 CyberStrike Arena. Всі права захищені.",
        },
        cookieBar: {
          message:
            "Ми використовуємо файли cookie для покращення вашого досвіду.",
          accept: "Прийняти",
          decline: "Відхилити",
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

    if (startGameBtn && gameOverlay && gameIframe) {
      startGameBtn.addEventListener("click", async () => {
        // The iframe is already loaded with the game URL
        // Just hide the overlay to reveal the game
        gameOverlay.style.display = "none";

        // Focus the iframe for better user experience
        gameIframe.focus();

        // Optional: Add a class to indicate the game is active
        gameIframe.classList.add("game-active");

        // Activate audio context for the entire page after user interaction
        try {
          // Create AudioContext for the main page
          if (window.AudioContext || window.webkitAudioContext) {
            const AudioContextClass =
              window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContextClass();

            // Resume AudioContext if suspended
            if (audioContext.state === "suspended") {
              await audioContext.resume();
            }

            // Store AudioContext for future use
            window.gameAudioContext = audioContext;
          }

          // Also try to activate AudioContext in iframe if possible
          if (
            gameIframe.contentWindow &&
            gameIframe.contentWindow.AudioContext
          ) {
            try {
              // Create AudioContext only after user interaction
              const iframeAudioContext =
                new gameIframe.contentWindow.AudioContext();

              // Resume AudioContext if suspended
              if (iframeAudioContext.state === "suspended") {
                await iframeAudioContext.resume();
              }

              // Store AudioContext for future use
              gameIframe.audioContext = iframeAudioContext;
            } catch (iframeError) {
              // Iframe AudioContext error handling - ignore silently
              // This is expected for cross-origin iframes
            }
          }
        } catch (error) {
          // AudioContext error handling - ignore silently
        }
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
      }
    });

    // Handle iframe load errors
    if (gameIframe) {
      gameIframe.addEventListener("load", () => {
        // Iframe loaded successfully
        gameIframe.classList.add("loaded");

        // Try to handle game initialization errors
        try {
          if (gameIframe.contentWindow) {
            // Add error handler for game window
            gameIframe.contentWindow.addEventListener("error", (e) => {
              // Silently handle game errors
              e.preventDefault();
            });

            // Check for YYGGames object and handle initialization
            try {
              if (
                gameIframe.contentWindow &&
                gameIframe.contentWindow.YYGGames &&
                typeof gameIframe.contentWindow.YYGGames === "object"
              ) {
                // Safely initialize YYGGames if available
                if (
                  typeof gameIframe.contentWindow.YYGGames.init === "function"
                ) {
                  gameIframe.contentWindow.YYGGames.init();
                }
              }
            } catch (error) {
              // YYGGames initialization failed - ignore silently
              // This is expected for cross-origin iframes
            }
          }
        } catch (error) {
          // Cross-origin error - ignore silently
        }
      });

      gameIframe.addEventListener("error", () => {
        // Handle iframe loading errors silently
      });
    }

    // Keyboard controls for the game
    this.setupKeyboardControls(gameIframe);
  }

  setupKeyboardControls(gameIframe) {
    if (!gameIframe) return;

    // Список клавіш для перенаправлення в iframe
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
      "KeyZ", // Додаткові клавіші для гри
      "KeyX",
      "KeyC",
    ];

    // Функція для фокусування iframe
    const focusIframe = () => {
      try {
        if (gameIframe.contentWindow) {
          gameIframe.contentWindow.focus();
        }
      } catch (error) {
        // Focus failed silently
      }
    };

    // Фокусуємо iframe при кліку на нього
    gameIframe.addEventListener("click", focusIframe);

    document.addEventListener("keydown", (e) => {
      // Перевіряємо, чи активний iframe і чи це клавіша гри
      if (
        gameIframe.classList.contains("game-active") &&
        gameKeys.includes(e.code)
      ) {
        e.preventDefault();
        e.stopPropagation();

        // Фокусуємо iframe перед відправкою події
        focusIframe();

        // Відправляємо подію в iframe
        this.sendKeyEventToIframe(gameIframe, "keydown", e);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (
        gameIframe.classList.contains("game-active") &&
        gameKeys.includes(e.code)
      ) {
        e.preventDefault();
        e.stopPropagation();

        // Відправляємо подію в iframe
        this.sendKeyEventToIframe(gameIframe, "keyup", e);
      }
    });

    // Додаємо обробник для автоматичного фокусування при завантаженні гри
    gameIframe.addEventListener("load", () => {
      setTimeout(focusIframe, 1000); // Фокусуємо через 1 секунду після завантаження
    });
  }

  sendKeyEventToIframe(iframe, eventType, originalEvent) {
    try {
      // Method 1: Direct event sending via postMessage
      iframe.contentWindow.postMessage(
        {
          type: "keyboardEvent",
          eventType: eventType,
          key: originalEvent.key,
          code: originalEvent.code,
          keyCode: originalEvent.keyCode,
          which: originalEvent.which,
          shiftKey: originalEvent.shiftKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey,
          metaKey: originalEvent.metaKey,
          timestamp: Date.now(),
        },
        "*"
      );

      // Method 2: Try to directly dispatch event to iframe
      if (iframe.contentWindow && iframe.contentWindow.document) {
        const iframeEvent = new KeyboardEvent(eventType, {
          key: originalEvent.key,
          code: originalEvent.code,
          keyCode: originalEvent.keyCode,
          which: originalEvent.which,
          shiftKey: originalEvent.shiftKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey,
          metaKey: originalEvent.metaKey,
          bubbles: true,
          cancelable: true,
        });

        iframe.contentWindow.document.dispatchEvent(iframeEvent);
      }

      // Method 3: Send event to iframe body
      if (
        iframe.contentWindow &&
        iframe.contentWindow.document &&
        iframe.contentWindow.document.body
      ) {
        const bodyEvent = new KeyboardEvent(eventType, {
          key: originalEvent.key,
          code: originalEvent.code,
          keyCode: originalEvent.keyCode,
          which: originalEvent.which,
          shiftKey: originalEvent.shiftKey,
          ctrlKey: originalEvent.ctrlKey,
          altKey: originalEvent.altKey,
          metaKey: originalEvent.metaKey,
          bubbles: true,
          cancelable: true,
        });

        iframe.contentWindow.document.body.dispatchEvent(bodyEvent);
      }
    } catch (error) {
      // Event sending failed silently - this is expected for cross-origin iframes
    }
  }

  toggleFullscreen(wrapper, btnText) {
    if (!document.fullscreenElement) {
      // Входимо в fullscreen
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
      // Виходимо з fullscreen
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

    if (heroBadge) heroBadge.textContent = this.data.hero.badge;
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
          <span class="hero__feature-icon">${feature.icon}</span>
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
                ).toLocaleDateString("uk-UA")}</span>
                <button class="btn btn--ghost news-card__read-more">Читати далі</button>
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

  renderContact() {
    if (!this.data.contact) return;

    const contactTitle = document.getElementById("contact-title");
    const contactDescription = document.querySelector(
      ".contact .section-description"
    );
    const contactEmail = document.getElementById("contact-email");

    if (contactTitle) contactTitle.textContent = this.data.contact.title;
    if (contactDescription)
      contactDescription.textContent = this.data.contact.description;

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
    if (!this.data.contact?.form) return;

    const form = this.data.contact.form;

    // Update name field
    const nameLabel = document.querySelector('label[for="contact-name"]');
    const nameInput = document.getElementById("contact-name");
    if (nameLabel) nameLabel.textContent = form.name.label;
    if (nameInput) nameInput.placeholder = form.name.placeholder;

    // Update email field
    const emailLabel = document.querySelector(
      'label[for="contact-email-input"]'
    );
    const emailInput = document.getElementById("contact-email-input");
    if (emailLabel) emailLabel.textContent = form.email.label;
    if (emailInput) emailInput.placeholder = form.email.placeholder;

    // Update message field
    const messageLabel = document.querySelector('label[for="contact-message"]');
    const messageInput = document.getElementById("contact-message");
    if (messageLabel) messageLabel.textContent = form.message.label;
    if (messageInput) messageInput.placeholder = form.message.placeholder;

    // Update submit button
    const submitBtn = document.querySelector(
      ".contact-form .btn--primary .btn__text"
    );
    if (submitBtn) submitBtn.textContent = form.submit;
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
        "uk-UA"
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

    // Simulate form submission
    const submitBtn = form.querySelector(".form__submit");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span class="btn__text">${this.data.contact.form.sending}</span><span class="btn__icon">📤</span>`;
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      alert(this.data.contact.form.success);
      form.reset();
    } catch (error) {
      alert(this.data.contact.form.error);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
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
  }
}
