const heroContent = {
  image: "./img/hero-banner.jpg",
  title: "Ninja Veggie Slice",
  subtitle: "Slice Fast. Chain Combos. Master the Art of the Blade.",
};


function renderHeroSection() {
  const content = heroContent;

  document.getElementById("hero-image").src = content.image;
  document.getElementById("hero-title").textContent = content.title;
  document.getElementById("hero-subtitle").textContent = content.subtitle;

}

document.addEventListener("DOMContentLoaded", renderHeroSection);
