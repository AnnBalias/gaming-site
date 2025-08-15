const setActiveLink = () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".mobileMenuLink");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace("./", "");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const loadHTML = (url, selector, callback) => {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (callback) callback();
    });
};

loadHTML("header.html", ".header", () => {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuToggle = document.querySelector(".menuToggle");

  if (!mobileMenu || !menuToggle) return;

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
});

loadHTML("footer.html", ".footer");
