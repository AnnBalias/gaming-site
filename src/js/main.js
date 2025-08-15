// Main JavaScript file for CyberStrike Arena website

class CyberStrikeArena {
  constructor() {
    this.data = null;
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.setupEventListeners();
      this.renderContent();
      this.initializeComponents();
    } catch (error) {
      console.error("Failed to initialize:", error);
    }
  }

  async loadData() {
    try {
      const response = await fetch("data.json");
      this.data = await response.json();
    } catch (error) {
      console.error("Failed to load data:", error);
      // Fallback data
      this.data = {
        hero: {
          title: "CyberStrike Arena",
          subtitle: "Enter the future of competitive combat",
          description:
            "Experience next-generation FPS warfare with cutting-edge weapons, tactical gameplay, and intense arena battles.",
          cta: "Play Now",
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
        mobileMenuClose.addEventListener("click", () => {
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

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
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

    if (startGameBtn && gameOverlay && gameIframe) {
      startGameBtn.addEventListener("click", () => {
        // The iframe is already loaded with the game URL
        // Just hide the overlay to reveal the game
        gameOverlay.style.display = "none";

        // Focus the iframe for better user experience
        gameIframe.focus();

        // Optional: Add a class to indicate the game is active
        gameIframe.classList.add("game-active");
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
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveNav = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header height
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to corresponding link
          const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    };
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on page load
    updateActiveNav();
  }

  renderContent() {
    if (!this.data) return;

    // Render hero section
    this.renderHero();

    // Render game features
    this.renderGameFeatures();

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
  }

  renderHero() {
    if (!this.data.hero) return;

    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const heroDescription = document.getElementById("hero-description");
    const playNowBtn = document.getElementById("play-now-btn");

    if (heroTitle) heroTitle.textContent = this.data.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = this.data.hero.subtitle;
    if (heroDescription)
      heroDescription.textContent = this.data.hero.description;
    if (playNowBtn)
      playNowBtn.querySelector(".btn__text").textContent = this.data.hero.cta;
  }

  renderGameFeatures() {
    if (!this.data.game?.features) return;

    const featuresGrid = document.getElementById("features-grid");
    if (!featuresGrid) return;

    featuresGrid.innerHTML = this.data.game.features
      .map(
        (feature) => `
      <div class="feature-card">
        <div class="feature-card__icon">
          <img src="${feature.icon}" alt="${feature.title}" />
        </div>
        <div class="feature-card__content">
          <h3 class="feature-card__title">${feature.title}</h3>
          <p class="feature-card__description">${feature.description}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  renderHowToPlay() {
    if (!this.data.howToPlay?.steps) return;

    const stepsContainer = document.getElementById("steps-container");
    if (!stepsContainer) return;

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

  renderReviews() {
    if (!this.data.reviews?.reviews) return;

    const reviewsGrid = document.getElementById("reviews-grid");
    if (!reviewsGrid) return;

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

  renderNews() {
    if (!this.data.news?.articles) return;

    const newsGrid = document.getElementById("news-grid");
    if (!newsGrid) return;

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
            ).toLocaleDateString()}</span>
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

  renderContact() {
    if (!this.data.contact) return;

    const contactEmail = document.getElementById("contact-email");
    if (contactEmail) {
      contactEmail.href = `mailto:${this.data.contact.email}`;
      contactEmail.textContent = this.data.contact.email;
    }
  }

  renderFooter() {
    if (!this.data.footer) return;

    const footerCopyright = document.getElementById("footer-copyright");
    if (footerCopyright) {
      footerCopyright.textContent = this.data.footer.copyright;
    }
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
      modalDate.textContent = new Date(article.date).toLocaleDateString();
      modalBody.innerHTML = article.content;

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

    submitBtn.innerHTML =
      '<span class="btn__text">Sending...</span><span class="btn__icon">📤</span>';
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      alert("Thank you for your message! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  openMobileMenu(mobileToggle, mobileMenu) {
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
  }

  closeMobileMenu(mobileToggle, mobileMenu) {
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
  }

  initializeComponents() {
    // Add any additional component initialization here
    console.log("CyberStrike Arena initialized successfully!");
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CyberStrikeArena();
});
