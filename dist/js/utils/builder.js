// Builder utility for mobile menu and navigation

const setActiveLink = () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav__link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace("./", "");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

// Setup mobile menu functionality
function setupMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!mobileMenu || !menuToggle) {
    return;
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.remove("open");
    }
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove("open");
    }
  });

  setActiveLink();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
});
