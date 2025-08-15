const gameOverviewContent = {
  title: "Game Overview",
  paragraphs: [
    "Welcome to <strong>Ninja Veggie Slice</strong>, the lightning-fast arcade battler where razor-sharp reflexes and even sharper blades reign supreme.",
    "Face off against rogue vegetables in timed slicing duels, combo-packed missions, and wave-based boss battles across a variety of dynamic kitchen arenas.",
    "Unlock unique ninja blades, master advanced slicing techniques, and dash through enemies with style and precision.",
    "<strong>Ninja Veggie Slice</strong> turns slicing into an artform — where timing, control, and strategy decide whether you dice or get diced.",
  ],
};

const gameFeatures = [
  {
    title: "Combo-Based Slicing Combat",
    text: "Chain perfect slices, aerial cuts, and elemental finishers to rack up scores and crush veggie foes in style.",
    icon: "./img/feature.png",
  },
  {
    title: "Custom Ninja Blades",
    text: "Unlock katana, twin daggers, or even mystical cleavers — each with special effects and slicing trails.",
    icon: "./img/feature.png",
  },
  {
    title: "Exploding Produce & Mutant Bosses",
    text: "Face off against chili bombs, stealthy eggplants, and mega-melon bosses in chaotic food-fighting arenas.",
    icon: "./img/feature.png",
  },
  {
    title: "Kitchen Arenas with Hazards",
    text: "Battle in sushi bars, midnight street markets, and bamboo kitchens — complete with fire pits, conveyor belts, and trap tiles.",
    icon: "./img/feature.png",
  },
  {
    title: "Events & Skill Duels",
    text: "Weekly speed-slice tournaments, creator-made slicing puzzles, and reaction-time trials hosted on GamingStrategyArena.com.",
    icon: "./img/feature.png",
  },
];

const howToPlaySteps = [
  {
    step: "1",
    title: "Select Your Blade",
    text: "Choose from starter blades like the Bamboo Katana or unlock advanced ones with speed, power, or range bonuses.",
  },
  {
    step: "2",
    title: "Master the Slice Flow",
    text: "Learn to time your cuts for maximum combo chains — fast isn’t always better if you want perfection.",
  },
  {
    step: "3",
    title: "Dash, Dodge & Counter",
    text: "Use your ninja agility to avoid explosive fruit and turn missed slices into counterattacks.",
  },
  {
    step: "4",
    title: "Upgrade & Customize",
    text: "Earn coins and tokens to upgrade blade abilities, visual effects, and your ninja's gear.",
  },
  {
    step: "5",
    title: "Climb the Cutboard",
    text: "Compete in ranked slicing challenges and show off your title on the GamingStrategyArena leaderboards.",
  },
];

const playerAchievements = {
  title: "Master Slicers",
  description: `
    Meet the elite fruit-slayers of <strong>Ninja Veggie Slice</strong> — fast, fearless, and focused.<br><br>
    These players turned kitchens into arenas and carrots into confetti.
  `,
  players: [
    {
      name: "SliceShinobi",
      stat: "Longest no-miss combo streak: 417 hits",
      avatar: "./img/user.png",
    },
    {
      name: "WasabiGhost",
      stat: "First to unlock and master the Phantom Cleaver",
      avatar: "./img/user.png",
    },
    {
      name: "ZenChefX",
      stat: "100% accuracy in 10 consecutive elite challenge runs",
      avatar: "./img/user.png",
    },
  ],
};

const easterEggsContent = {
  title: "Hidden Blades & Kitchen Myths",
  description: `
    <strong>Ninja Veggie Slice</strong> is filled with secrets for the dedicated slicer.<br><br>
    Discover cursed chopping boards, whispering tomatoes, and the legendary “Onion Spirit” hidden within ranked arenas.<br><br>
    Slice at strange angles, follow flashing produce, and meditate between rounds — the secrets are sharp, and only the worthy unlock them.
  `,
};



function renderGameOverview() {
  const { title, paragraphs } = gameOverviewContent;

  document.getElementById("overview-title").textContent = title;

  const container = document.getElementById("overview-paragraphs");
  container.innerHTML = paragraphs
    .map((p) => `<p class="text">${p}</p>`)
    .join("");
}

function renderFeatures() {
  const list = document.getElementById("features-list");

  list.innerHTML = gameFeatures
    .map(
      (f) => `
      <li class="features__item">
          <h3 class="subtitle"><strong>${f.title}:</strong></h3>
          <p class="desc">${f.text}</p>
     
      </li>
    `
    )
    .join("");
}

function renderHowToPlay() {
  const list = document.getElementById("howToPlayList");

  list.innerHTML = howToPlaySteps
    .map(
      (stepObj, index) => `
        <li class="card">
          <div class="content">
            <div class="step-num">${index + 1}.</div>
            <p class="para">
              <strong>${stepObj.title}:</strong> ${stepObj.text}
            </p>
          </div>
        </li>
      `
    )
    .join("");
}

function renderPlayerAchievements() {
  const { title, description, players } = playerAchievements;

  document.getElementById("achievements-title").textContent = title;
  document.getElementById("achievements-desc").innerHTML = description;

  const container = document.getElementById("achievement-cards");

  container.innerHTML = players
    .map(
      (p) => `
      <li class="achievement-card">
        <img src="${p.avatar}" alt="${p.name}" class="achievement-avatar" />
        <h3>${p.name}</h3>
        <p>${p.stat}</p>
      </li>
    `
    )
    .join("");
}

function renderEasterEggs() {
  const { title, description } = easterEggsContent;
  document.getElementById("easter-title").textContent = title;
  document.getElementById("easter-description").innerHTML = description;
}

document.addEventListener("DOMContentLoaded", () => {
  renderGameOverview();
  renderFeatures();
  renderHowToPlay();
  renderPlayerAchievements();
  renderEasterEggs();
});
