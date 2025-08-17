// News handler utility

class NewsHandler {
  constructor() {
    this.newsData = null;
    this.currentNewsIndex = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.waitForDataAndRender();
  }

  waitForDataAndRender() {
    // Wait for data to be loaded
    if (window.gameData) {
      this.loadNewsData();
      this.renderNewsPage();
      this.renderNewsSection();
    } else {
      // Check every 100ms for data
      const checkData = () => {
        if (window.gameData) {
          this.loadNewsData();
          this.renderNewsPage();
          this.renderNewsSection();
        } else {
          setTimeout(checkData, 100);
        }
      };
      checkData();
    }
  }

  setupEventListeners() {
    // Listen for clicks on news items
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("read-more-btn")) {
        const newsItem = e.target.closest(".news-item, .news-page-item");
        if (newsItem) {
          const index = parseInt(newsItem.dataset.index);
          this.showNewsModal(index);
        }
      }
    });

    // Close modal when clicking outside or on close button
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("news-modal") ||
        e.target.classList.contains("modal-close")
      ) {
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

  loadNewsData() {
    // Try to get news data from various sources
    if (
      window.gameData &&
      window.gameData.news &&
      window.gameData.news.articles
    ) {
      this.newsData = window.gameData.news.articles;
    } else if (
      window.gameData &&
      window.gameData.news &&
      window.gameData.news.items
    ) {
      this.newsData = window.gameData.news.items;
    } else {
      // Fallback data
      this.newsData = [
        {
          title: "New Song Pack Released!",
          date: "2025-01-15",
          excerpt:
            "Experience 10 new challenging songs with unique rhythms and beats. Available now for all players!",
          content:
            "We're excited to announce the release of our latest song pack featuring 10 brand new tracks that will test your rhythm skills to the limit. Each song has been carefully crafted to provide a unique challenge while maintaining the fun and addictive gameplay that players love.",
        },
        {
          title: "Tournament Season 3 Begins",
          date: "2025-01-10",
          excerpt:
            "Join the competitive scene and compete against players worldwide. Prizes and recognition await!",
          content:
            "The highly anticipated Tournament Season 3 is now live! Compete against players from around the world in weekly challenges and monthly championships. Top performers will receive exclusive rewards and recognition on our global leaderboards.",
        },
        {
          title: "Community Update",
          date: "2025-01-05",
          excerpt:
            "We've listened to your feedback and implemented several improvements to enhance your gaming experience.",
          content:
            "Based on your valuable feedback, we've made significant improvements to the game including enhanced graphics, smoother gameplay, and new accessibility features. We're committed to making the best rhythm gaming experience possible.",
        },
        {
          title: "New Features Coming Soon",
          date: "2025-01-01",
          excerpt:
            "Get ready for exciting new features including custom song creation and multiplayer modes!",
          content:
            "We're working hard on bringing you amazing new features including a custom song creator that will let you make your own tracks, multiplayer modes for playing with friends, and enhanced social features. Stay tuned for more updates!",
        },
      ];
    }
  }

  renderNewsPage() {
    // Check if we're on the news page
    const newsPageList = document.getElementById("news-page-list");
    if (!newsPageList || !this.newsData) return;

    // Render news articles
    newsPageList.innerHTML = this.newsData
      .map(
        (news, index) => `
      <article class="news-page-item" data-index="${index}">
        <div class="news-page-item__content">
          <h3 class="news-page-item__title">${news.title}</h3>
          <div class="news-page-item__meta">
            <span class="news-page-item__date">${new Date(
              news.date
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
          <p class="news-page-item__excerpt">${news.excerpt}</p>
          <button class="btn btn--primary read-more-btn">Read More</button>
        </div>
      </article>
    `
      )
      .join("");

    // Add styles for news page if not already present
    this.addNewsPageStyles();
  }

  renderNewsSection() {
    // Check if we're on the home page news section
    const newsList = document.getElementById("news-list");
    if (!newsList || !this.newsData) return;

    // Render news articles for home page section
    newsList.innerHTML = this.newsData
      .slice(0, 3) // Show only first 3 news items
      .map(
        (news, index) => `
      <article class="news-item" data-index="${index}">
        <div class="news-item__content">
          <h3 class="news-item__title">${news.title}</h3>
          <div class="news-item__meta">
            <span class="news-item__date">${new Date(
              news.date
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
          <p class="news-item__excerpt">${news.excerpt}</p>
          <button class="btn btn--primary read-more-btn">Read more</button>
        </div>
      </article>
    `
      )
      .join("");

    // Add "More news" button to footer if it doesn't exist
    this.addMoreNewsButton();
  }

  addMoreNewsButton() {
    // Check if we're on the home page and if the news footer exists
    const newsSection = document.querySelector(".news");
    if (!newsSection) return;

    // Check if the footer already exists
    let newsFooter = newsSection.querySelector(".news__footer");

    if (!newsFooter) {
      // Create the footer if it doesn't exist
      const newsContent = newsSection.querySelector(".news__content");
      if (newsContent) {
        newsFooter = document.createElement("div");
        newsFooter.className = "news__footer";
        newsContent.appendChild(newsFooter);
      }
    }

    // Add the "More news" button if it doesn't exist
    if (newsFooter && !newsFooter.querySelector(".btn--primary")) {
      newsFooter.innerHTML =
        '<a href="news.html" class="btn btn--primary">More news</a>';
    }
  }

  addNewsPageStyles() {
    if (document.getElementById("news-page-styles")) return;

    const styles = document.createElement("style");
    styles.id = "news-page-styles";
    styles.textContent = `
      .news-page-item {
        background: white;
        border-radius: 16px;
        padding: 28px;
        margin-bottom: 28px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      
      .news-page-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
      }
      
      .news-page-item__title {
        font-size: 26px;
        font-weight: 700;
        color: #333;
        margin: 0 0 16px 0;
        line-height: 1.3;
      }
      
      .news-page-item__meta {
        margin-bottom: 18px;
      }
      
      .news-page-item__date {
        color: #666;
        font-size: 14px;
        font-weight: 500;
      }
      
      .news-page-item__excerpt {
        color: #555;
        line-height: 1.7;
        margin-bottom: 24px;
        font-size: 16px;
      }
      
      .read-more-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      
      .read-more-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
      }

      /* Mobile styles for screens 540px and below */
      @media (max-width: 540px) {
        .news-page-item {
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        
        .news-page-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        
        .news-page-item__title {
          font-size: 20px;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }
        
        .news-page-item__meta {
          margin-bottom: 14px;
        }
        
        .news-page-item__date {
          font-size: 13px;
        }
        
        .news-page-item__excerpt {
          line-height: 1.6;
          margin-bottom: 18px;
          font-size: 15px;
        }
        
        .read-more-btn {
          padding: 12px 24px;
          font-size: 14px;
          border-radius: 6px;
        }
      }

      /* Extra small screens */
      @media (max-width: 360px) {
        .news-page-item {
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 10px;
        }
        
        .news-page-item__title {
          font-size: 18px;
          margin: 0 0 10px 0;
        }
        
        .news-page-item__meta {
          margin-bottom: 12px;
        }
        
        .news-page-item__date {
          font-size: 12px;
        }
        
        .news-page-item__excerpt {
          margin-bottom: 16px;
          font-size: 14px;
        }
        
        .read-more-btn {
          padding: 10px 20px;
          font-size: 13px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  showNewsModal(index) {
    // Get news data from the main data module
    if (
      window.gameData &&
      window.gameData.news &&
      window.gameData.news.articles
    ) {
      this.newsData = window.gameData.news.articles;
    } else if (
      window.gameData &&
      window.gameData.news &&
      window.gameData.news.items
    ) {
      this.newsData = window.gameData.news.items;
    } else {
      // Fallback data
      this.newsData = [
        {
          title: "New Song Pack Released!",
          date: "2025-01-15",
          excerpt:
            "Experience 10 new challenging songs with unique rhythms and beats. Available now for all players!",
          content:
            "We're excited to announce the release of our latest song pack featuring 10 brand new tracks that will test your rhythm skills to the limit. Each song has been carefully crafted to provide a unique challenge while maintaining the fun and addictive gameplay that players love.",
        },
        {
          title: "Tournament Season 3 Begins",
          date: "2025-01-10",
          excerpt:
            "Join the competitive scene and compete against players worldwide. Prizes and recognition await!",
          content:
            "The highly anticipated Tournament Season 3 is now live! Compete against players from around the world in weekly challenges and monthly championships. Top performers will receive exclusive rewards and recognition on our global leaderboards.",
        },
        {
          title: "Community Update",
          date: "2025-01-05",
          excerpt:
            "We've listened to your feedback and implemented several improvements to enhance your gaming experience.",
          content:
            "Based on your valuable feedback, we've made significant improvements to the game including enhanced graphics, smoother gameplay, and new accessibility features. We're committed to making the best rhythm gaming experience possible.",
        },
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

    // Determine if content needs scrolling
    const contentLength = (news.content || news.excerpt).length;
    const needsScroll = contentLength > 500; // Show scroll for long content

    modal.innerHTML = `
       <div class="modal-content ${
         needsScroll ? "modal-content--scrollable" : "modal-content--no-scroll"
       }">
         <div class="modal-header">
           <h2>${news.title}</h2>
           <button class="modal-close" type="button" aria-label="Close modal">&times;</button>
         </div>
         <div class="modal-body">
           <div class="news-meta">
             <span class="news-date">${new Date(news.date).toLocaleDateString(
               "en-US",
               {
                 year: "numeric",
                 month: "long",
                 day: "numeric",
               }
             )}</span>
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
        padding: 16px;
        box-sizing: border-box;
      }
      
      .news-modal.show {
        opacity: 1;
      }
      
             .modal-content {
         background: white;
         border-radius: 12px;
         max-width: 600px;
         width: 100%;
         transform: scale(0.9);
         transition: transform 0.3s ease;
         box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
       }
       
       .modal-content--scrollable {
         max-height: 90vh;
         overflow-y: auto;
         scrollbar-width: thin;
         scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
       }
       
       .modal-content--no-scroll {
         max-height: none;
         overflow-y: visible;
       }
       
       .modal-content--scrollable::-webkit-scrollbar {
         width: 6px;
       }
       
       .modal-content--scrollable::-webkit-scrollbar-track {
         background: transparent;
       }
       
       .modal-content--scrollable::-webkit-scrollbar-thumb {
         background: rgba(0, 0, 0, 0.2);
         border-radius: 3px;
       }
       
       .modal-content--scrollable::-webkit-scrollbar-thumb:hover {
         background: rgba(0, 0, 0, 0.3);
       }
      
      .news-modal.show .modal-content {
        transform: scale(1);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 24px 24px 20px 24px;
        border-bottom: 1px solid #eee;
        position: sticky;
        top: 0;
        background: white;
        z-index: 1;
      }
      
      .modal-header h2 {
        margin: 0;
        color: #333;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.3;
        flex: 1;
        padding-right: 16px;
      }
      
             .modal-close {
         background: none;
         border: none;
         font-size: 28px;
         cursor: pointer;
         color: #666;
         padding: 4px;
         border-radius: 50%;
         width: 40px;
         height: 40px;
         display: flex;
         align-items: center;
         justify-content: center;
         transition: all 0.2s ease;
         flex-shrink: 0;
         min-width: 40px;
         min-height: 40px;
       }
      
      .modal-close:hover {
        color: #333;
        background: rgba(0, 0, 0, 0.05);
      }
      
      .modal-body {
        padding: 24px;
      }
      
      .news-meta {
        margin-bottom: 20px;
        color: #666;
        font-size: 14px;
        font-weight: 500;
      }
      
      .news-content p {
        line-height: 1.7;
        color: #333;
        margin: 0;
        font-size: 16px;
      }

      /* Mobile styles for screens 540px and below */
      @media (max-width: 540px) {
        .news-modal {
          padding: 12px;
          align-items: flex-start;
          padding-top: 20px;
        }
        
                 .modal-content {
           border-radius: 16px;
           width: 100%;
         }
         
         .modal-content--scrollable {
           max-height: calc(100vh - 40px);
         }
         
         .modal-content--no-scroll {
           max-height: none;
         }
        
        .modal-header {
          padding: 20px 20px 16px 20px;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        
        .modal-header h2 {
          font-size: 20px;
          line-height: 1.4;
          padding-right: 0;
        }
        
                 .modal-close {
           position: absolute;
           top: 16px;
           right: 16px;
           width: 36px;
           height: 36px;
           min-width: 36px;
           min-height: 36px;
           font-size: 24px;
           background: rgba(0, 0, 0, 0.1);
           color: #333;
         }
        
        .modal-close:hover {
          background: rgba(0, 0, 0, 0.15);
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .news-meta {
          margin-bottom: 16px;
          font-size: 13px;
        }
        
        .news-content p {
          font-size: 15px;
          line-height: 1.6;
        }
      }

      /* Extra small screens */
      @media (max-width: 360px) {
        .news-modal {
          padding: 8px;
          padding-top: 16px;
        }
        
                 .modal-content {
           border-radius: 12px;
         }
         
         .modal-content--scrollable {
           max-height: calc(100vh - 32px);
         }
         
         .modal-content--no-scroll {
           max-height: none;
         }
        
        .modal-header {
          padding: 16px 16px 12px 16px;
        }
        
        .modal-header h2 {
          font-size: 18px;
        }
        
                 .modal-close {
           top: 12px;
           right: 12px;
           width: 32px;
           height: 32px;
           min-width: 32px;
           min-height: 32px;
           font-size: 20px;
         }
        
        .modal-body {
          padding: 16px;
        }
        
        .news-content p {
          font-size: 14px;
        }
      }
    `;

    document.head.appendChild(styles);
  }
}

// Initialize news handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NewsHandler();
});
