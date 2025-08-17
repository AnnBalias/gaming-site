// Main data and rendering functions

let gameData = null;

// Fallback data in case JSON loading fails
const fallbackData = {
  meta: {
    title: "QuestSagaOnline.com - Rhythmic Music Battle",
    description:
      "Dive into crazy rhythms and extraordinary duels. Press arrows in time with the beats to hit every note and stay in rhythm!",
    keywords:
      "questsagaonline, rhythm game, music game, dance game, battle, music",
  },
  header: {
    nav: [
      { href: "#hero", text: "Home" },
      { href: "#game", text: "Game" },
      { href: "#how-to-play", text: "How to Play" },
      { href: "#news", text: "News" },
      { href: "#contact", text: "Contact" },
    ],
  },
  game: {
    title: "Play Friday Night Funkin",
    description: "Click the button below to start the game",
    overlayTitle: "Ready to play?",
    overlayText: "Click to start the musical battle",
    startButton: "Start Game",
    fullscreenButton: "Fullscreen",
  },
  howToPlay: {
    title: "How to Play",
    description: "Master the rhythm and become the ultimate music warrior",
    steps: [
      {
        step: "1",
        title: "Choose Your Character",
        text: "Select from Boyfriend, Girlfriend, or unlock special characters with unique abilities.",
      },
      {
        step: "2",
        title: "Master the Controls",
        text: "Use arrow keys (← ↑ ↓ →) to hit notes in time with the music. Timing is everything!",
      },
      {
        step: "3",
        title: "Build Combos",
        text: "Chain perfect hits to build combos and increase your score multiplier.",
      },
      {
        step: "4",
        title: "Survive the Battle",
        text: "Keep your health bar above zero while maintaining rhythm accuracy.",
      },
      {
        step: "5",
        title: "Unlock New Songs",
        text: "Complete challenges to unlock new songs and difficulty levels.",
      },
    ],
  },
  reviews: {
    title: "Player Reviews",
    description: "What our players say about the game",
    items: [
      {
        name: "RhythmMaster",
        rating: 5,
        text: "Amazing rhythm game! The music is catchy and the gameplay is addictive. Perfect for music lovers!",
      },
      {
        name: "BeatBoxer",
        rating: 5,
        text: "Best rhythm game I've played in years. The difficulty progression is perfect and keeps me coming back.",
      },
      {
        name: "MusicLover",
        rating: 4,
        text: "Great game with awesome music selection. The visual effects are stunning and the gameplay is smooth.",
      },
    ],
  },
  news: {
    title: "Latest News",
    description: "Stay up to date with the latest events and announcements",
    items: [
      {
        title: "New Song Pack Released!",
        date: "2025-01-15",
        excerpt:
          "Experience 10 new challenging songs with unique rhythms and beats. Available now for all players!",
      },
      {
        title: "Tournament Season 3 Begins",
        date: "2025-01-10",
        excerpt:
          "Join the competitive scene and compete against players worldwide. Prizes and recognition await!",
      },
      {
        title: "Community Update",
        date: "2025-01-05",
        excerpt:
          "We've listened to your feedback and implemented several improvements to enhance your gaming experience.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    description: "Have questions or suggestions? Write to us!",
    info: {
      email: "contact@questsagaonline.com",
      address: "123 Gaming Street, Sydney NSW 2000, Australia",
      phone: "+61 2 9123 4567",
      discord: "Join our Discord server",
    },
    form: {
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      messageLabel: "Message",
      messagePlaceholder: "Enter your message",
      submitText: "Send Message",
    },
  },
  disclaimer: {
    title: "Disclaimer",
    description: "Important information about using our website and game",
    blocks: [
      {
        title: "Terms of Use",
        content:
          "By using this website and game, you agree to our terms of service and community guidelines.",
      },
      {
        title: "Age Restrictions",
        content:
          "This game is suitable for players aged 13 and above. Parental guidance is recommended for younger players.",
      },
      {
        title: "Liability",
        content:
          "We are not responsible for any damages or losses resulting from the use of our website or game.",
      },
      {
        title: "Technical Requirements",
        content:
          "Ensure your device meets the minimum system requirements for optimal gameplay experience.",
      },
      {
        title: "Privacy",
        content:
          "Your privacy is important to us. Please review our Privacy Policy for detailed information.",
      },
      {
        title: "Changes to Terms",
        content:
          "We reserve the right to modify these terms at any time. Continued use constitutes acceptance of changes.",
      },
    ],
  },
  footer: {
    sections: [
      {
        title: "Game",
        links: [
          { href: "#game", text: "Overview" },
          { href: "#how-to-play", text: "How to Play" },
          { href: "#reviews", text: "Reviews" },
        ],
      },
      {
        title: "Community",
        links: [
          { href: "#news", text: "News" },
          { href: "#contact", text: "Contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { href: "privacy.html", text: "Privacy Policy" },
          { href: "terms.html", text: "Terms of Service" },
          { href: "cookies.html", text: "Cookie Policy" },
        ],
      },
    ],
    copyright: "© All rights reserved, 2025",
  },
  cookieBar: {
    message: "We use cookies to improve your experience on our website.",
    accept: "Accept",
    decline: "Decline",
  },
};

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    gameData = data;
  } catch (error) {
    gameData = fallbackData;
  }

  // Make data available globally for other modules
  window.gameData = gameData;

  // Initialize rendering after data is loaded
  initializeRendering();
}

// Initialize all rendering functions
function initializeRendering() {
  // Wait a bit for DOM to be ready
  setTimeout(() => {
    renderGameSection();
    renderHowToPlay();
    renderReviews();
    renderNews();
    renderContact();
    renderDisclaimer();
    renderFooter();
    renderCookieBar();
    setupNewsModal();
  }, 100);
}

// Rendering functions
function renderGameSection() {
  if (!gameData || !gameData.game) {
    return;
  }

  const gameDataObj = gameData.game;

  // Update game section title and description if they exist
  const gameTitle = document.querySelector(".game-section .section-title");
  const gameDescription = document.querySelector(
    ".game-section .section-description"
  );
  const startButtonEl = document.getElementById("start-game-btn");
  const fullscreenButtonEl = document.getElementById("fullscreen-btn-text");

  if (gameTitle)
    gameTitle.textContent = gameDataObj.title || "Play Friday Night Funkin";
  if (gameDescription)
    gameDescription.textContent =
      gameDataObj.description || "Click the button below to start the game";
  if (startButtonEl)
    startButtonEl.textContent = gameDataObj.startButton || "Start Game";
  if (fullscreenButtonEl)
    fullscreenButtonEl.textContent =
      gameDataObj.fullscreenButton || "Fullscreen";
}

function renderHowToPlay() {
  if (!gameData || !gameData.howToPlay) {
    return;
  }

  const howToPlayData = gameData.howToPlay;

  const sectionTitle = document.getElementById("how-to-play-title");
  const sectionDescription = document.querySelector(
    ".how-to-play .section-description"
  );
  const stepsContainer = document.getElementById("steps-container");

  if (sectionTitle)
    sectionTitle.textContent = howToPlayData.title || "How to Play";
  if (sectionDescription)
    sectionDescription.textContent =
      howToPlayData.description ||
      "Master the rhythm and become the ultimate music warrior";

  if (stepsContainer && howToPlayData.steps) {
    stepsContainer.innerHTML = howToPlayData.steps
      .map(
        (step) => `
      <div class="step-card">
        <div class="step-card__number">${step.step}</div>
        <div class="step-card__content">
          <h3 class="step-card__title">${step.title}</h3>
          <p class="step-card__description">${step.text || step.description}</p>
        </div>
      </div>
    `
      )
      .join("");
  }
}

function renderReviews() {
  if (!gameData || !gameData.reviews) {
    return;
  }

  const reviewsData = gameData.reviews;

  const sectionTitle = document.getElementById("reviews-title");
  const sectionDescription = document.querySelector(
    ".reviews .section-description"
  );
  const reviewsGrid = document.getElementById("reviews-grid");

  if (sectionTitle)
    sectionTitle.textContent = reviewsData.title || "Player Reviews";
  if (sectionDescription)
    sectionDescription.textContent =
      reviewsData.description || "What our players say about the game";

  if (reviewsGrid) {
    const reviews = reviewsData.reviews || reviewsData.items || [];

    reviewsGrid.innerHTML = reviews
      .map(
        (review) => `
      <div class="review-card">
        <div class="review-card__header">
          <img src="assets/images/user.jpg" alt="${
            review.player || review.name
          }" class="review-card__avatar" />
          <div class="review-card__info">
            <h4 class="review-card__player">${review.player || review.name}</h4>
            <div class="review-card__rating">
              ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
            </div>
          </div>
        </div>
        <p class="review-card__comment">${review.comment || review.text}</p>
      </div>
    `
      )
      .join("");
  }
}

function renderNews() {
  if (!gameData || !gameData.news) {
    return;
  }

  const newsData = gameData.news;

  const sectionTitle = document.getElementById("news-title");
  const sectionDescription = document.querySelector(
    ".news .section-description"
  );
  const newsGrid = document.getElementById("news-list");
  const newsPageGrid = document.getElementById("news-page-list");

  if (sectionTitle) sectionTitle.textContent = newsData.title || "Latest News";
  if (sectionDescription)
    sectionDescription.textContent =
      newsData.description ||
      "Stay up to date with the latest events and announcements";

  // Render news for main page
  if (newsGrid) {
    const articles = newsData.articles || newsData.items || [];
    const articlesToShow = articles.slice(0, 3);

    newsGrid.innerHTML = articlesToShow
      .map(
        (item, index) => `
      <div class="news-card" data-article-id="${item.id || index + 1}">
        <div class="news-card__image">
          <img src="assets/images/post.jpg" alt="${item.title}" />
        </div>
        <div class="news-card__content">
          <h3 class="news-card__title">${item.title}</h3>
          <p class="news-card__excerpt">${item.excerpt}</p>
          <div class="news-card__meta">
            <span class="news-card__date">${new Date(
              item.date
            ).toLocaleDateString("en-US")}</span>
            <button class="btn btn--ghost news-card__read-more">Read more</button>
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
        openNewsModal(articleId);
      });
    });
  }

  // Render news for news page
  if (newsPageGrid) {
    const articles = newsData.articles || newsData.items || [];

    newsPageGrid.innerHTML = articles
      .map(
        (item, index) => `
      <div class="news-card" data-article-id="${item.id || index + 1}">
        <div class="news-card__image">
          <img src="assets/images/post.jpg" alt="${item.title}" />
        </div>
        <div class="news-card__content">
          <h3 class="news-card__title">${item.title}</h3>
          <p class="news-card__excerpt">${item.excerpt}</p>
          <div class="news-card__meta">
            <span class="news-card__date">${new Date(
              item.date
            ).toLocaleDateString("en-US")}</span>
            <button class="btn btn--ghost news-card__read-more">Read more</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Add click handlers for news page cards
    const newsPageCards = document.querySelectorAll(
      "#news-page-list .news-card"
    );
    newsPageCards.forEach((card) => {
      card.addEventListener("click", () => {
        const articleId = card.dataset.articleId;
        openNewsModal(articleId);
      });
    });
  }
}

function openNewsModal(articleId) {
  const articles = gameData.news.articles || gameData.news.items || [];
  const article = articles.find((a, index) => (a.id || index + 1) == articleId);
  if (!article) return;

  const modal = document.getElementById("news-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDate = document.getElementById("modal-date");
  const modalBody = document.getElementById("modal-body");

  if (modal && modalTitle && modalImage && modalDate && modalBody) {
    modalTitle.textContent = article.title;
    modalImage.src = "assets/images/post.jpg";
    modalImage.alt = article.title;
    modalDate.textContent = new Date(article.date).toLocaleDateString("en-US");
    modalBody.textContent = article.content || article.excerpt;

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }
}

function closeNewsModal() {
  const modal = document.getElementById("news-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
}

function setupNewsModal() {
  const modal = document.getElementById("news-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");

  if (modal && modalOverlay && modalClose) {
    // Close modal when clicking overlay
    modalOverlay.addEventListener("click", closeNewsModal);

    // Close modal when clicking close button
    modalClose.addEventListener("click", closeNewsModal);

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeNewsModal();
      }
    });
  }
}

function renderContact() {
  if (!gameData || !gameData.contact) {
    return;
  }

  const contactData = gameData.contact;

  const sectionTitle = document.getElementById("contact-title");
  const sectionDescription = document.querySelector(
    ".contact .section-description"
  );
  const emailEl = document.getElementById("contact-email");
  const addressEl = document.getElementById("contact-address");

  if (sectionTitle)
    sectionTitle.textContent = contactData.title || "Contact Us";
  if (sectionDescription)
    sectionDescription.textContent =
      contactData.description || "Have questions or suggestions? Write to us!";

  if (contactData.info) {
    if (emailEl) {
      emailEl.href = `mailto:${contactData.info.email}`;
      emailEl.textContent = contactData.info.email;
    }
    if (addressEl) addressEl.textContent = contactData.info.address;
  }
}

function renderDisclaimer() {
  if (!gameData || !gameData.disclaimer) {
    return;
  }

  const disclaimerData = gameData.disclaimer;

  const sectionTitle = document.querySelector(
    ".disclaimer-section .section-title"
  );
  const sectionDescription = document.querySelector(
    ".disclaimer-section .section-description"
  );
  const blocksContainer = document.querySelector(
    ".disclaimer-section .disclaimer-content"
  );

  if (sectionTitle)
    sectionTitle.textContent = disclaimerData.title || "Disclaimer";
  if (sectionDescription)
    sectionDescription.textContent =
      disclaimerData.description ||
      "Important information about using our website and game";

  if (blocksContainer && disclaimerData.blocks) {
    blocksContainer.innerHTML = disclaimerData.blocks
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

function renderFooter() {
  if (!gameData || !gameData.footer) {
    return;
  }

  const footerData = gameData.footer;

  const copyrightEl = document.getElementById("footer-copyright");

  if (copyrightEl)
    copyrightEl.textContent =
      footerData.copyright || "© All rights reserved, 2025";
}

function renderCookieBar() {
  if (!gameData || !gameData.cookieBar) {
    return;
  }

  const cookieData = gameData.cookieBar;

  const messageEl = document.getElementById("cookie-message");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if (messageEl)
    messageEl.textContent =
      cookieData.message ||
      "We use cookies to improve your experience on our website.";
  if (acceptBtn) acceptBtn.textContent = cookieData.accept || "Accept";
  if (declineBtn) declineBtn.textContent = cookieData.decline || "Decline";
}

// Initialize data loading when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
