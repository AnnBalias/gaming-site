// Hero section data and rendering

let heroContent = null;

const fallbackHeroContent = {
  image: "assets/images/fnf-hero-bg.jpg",
  title: "Friday Night Funkin",
  subtitle:
    "Dive into crazy rhythms and extraordinary duels. Press arrows in time with the beats to hit every note and stay in rhythm!",
};

async function loadHeroData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data.hero) {
      heroContent = {
        image: data.hero.gamePreview?.image || "assets/images/fnf-hero-bg.jpg",
        title: data.hero.title || "Friday Night Funkin",
        subtitle:
          data.hero.description ||
          "Dive into crazy rhythms and extraordinary duels. Press arrows in time with the beats to hit every note and stay in rhythm!",
      };
    } else {
      heroContent = fallbackHeroContent;
    }
  } catch (error) {
    heroContent = fallbackHeroContent;
  }
  renderHeroSection();
}

function renderHeroSection() {
  if (!heroContent) return;

  const heroImage = document.querySelector(".hero__background");
  const heroTitle = document.querySelector(".hero__title");
  const heroDescription = document.querySelector(".hero__description");

  if (heroImage) {
    heroImage.style.backgroundImage = `url(${heroContent.image})`;
  }

  if (heroTitle) {
    heroTitle.textContent = heroContent.title;
  }

  if (heroDescription) {
    heroDescription.textContent = heroContent.subtitle;
  }
}

document.addEventListener("DOMContentLoaded", loadHeroData);
