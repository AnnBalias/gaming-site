// News handler utility

class NewsHandler {
  constructor() {
    this.newsData = null;
    this.currentNewsIndex = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for clicks on news items
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("read-more-btn")) {
        const newsItem = e.target.closest(".news-item");
        if (newsItem) {
          const index = parseInt(newsItem.dataset.index);
          this.showNewsModal(index);
        }
      }
    });

    // Close modal when clicking outside or on close button
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("news-modal") || e.target.classList.contains("modal-close")) {
        this.hideNewsModal();
      }
    });

    // Close modal on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideNewsModal();
      }
    });
  }

  showNewsModal(index) {
    // Get news data from the main data module
    if (window.gameData && window.gameData.news && window.gameData.news.articles) {
      this.newsData = window.gameData.news.articles;
    } else if (window.gameData && window.gameData.news && window.gameData.news.items) {
      this.newsData = window.gameData.news.items;
    } else {
      // Fallback data
      this.newsData = [
        {
          title: "New Song Pack Released!",
          date: "2025-01-15",
          excerpt: "Experience 10 new challenging songs with unique rhythms and beats. Available now for all players!",
          content: "We're excited to announce the release of our latest song pack featuring 10 brand new tracks that will test your rhythm skills to the limit. Each song has been carefully crafted to provide a unique challenge while maintaining the fun and addictive gameplay that players love."
        },
        {
          title: "Tournament Season 3 Begins",
          date: "2025-01-10",
          excerpt: "Join the competitive scene and compete against players worldwide. Prizes and recognition await!",
          content: "The highly anticipated Tournament Season 3 is now live! Compete against players from around the world in weekly challenges and monthly championships. Top performers will receive exclusive rewards and recognition on our global leaderboards."
        },
        {
          title: "Community Update",
          date: "2025-01-05",
          excerpt: "We've listened to your feedback and implemented several improvements to enhance your gaming experience.",
          content: "Based on your valuable feedback, we've made significant improvements to the game including enhanced graphics, smoother gameplay, and new accessibility features. We're committed to making the best rhythm gaming experience possible."
        }
      ];
    }

    if (index >= 0 && index < this.newsData.length) {
      this.currentNewsIndex = index;
      const news = this.newsData[index];
      this.createNewsModal(news);
    }
  }

  createNewsModal(news) {
    // Remove existing modal if any
    this.hideNewsModal();

    const modal = document.createElement("div");
    modal.className = "news-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${news.title}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="news-meta">
            <span class="news-date">${new Date(news.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}</span>
          </div>
          <div class="news-content">
            <p>${news.content || news.excerpt}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    this.addModalStyles();
    
    // Show modal with animation
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }

  hideNewsModal() {
    const existingModal = document.querySelector(".news-modal");
    if (existingModal) {
      existingModal.classList.remove("show");
      setTimeout(() => {
        existingModal.remove();
      }, 300);
    }
  }

  addModalStyles() {
    if (document.getElementById("news-modal-styles")) return;

    const styles = document.createElement("style");
    styles.id = "news-modal-styles";
    styles.textContent = `
      .news-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .news-modal.show {
        opacity: 1;
      }
      
      .modal-content {
        background: white;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }
      
      .news-modal.show .modal-content {
        transform: scale(1);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
      }
      
      .modal-header h2 {
        margin: 0;
        color: #333;
      }
      
      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
      }
      
      .modal-close:hover {
        color: #333;
      }
      
      .modal-body {
        padding: 20px;
      }
      
      .news-meta {
        margin-bottom: 15px;
        color: #666;
        font-size: 14px;
      }
      
      .news-content p {
        line-height: 1.6;
        color: #333;
        margin: 0;
      }
    `;

    document.head.appendChild(styles);
  }
}

// Initialize news handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NewsHandler();
});
