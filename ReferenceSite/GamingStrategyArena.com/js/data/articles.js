const articlesPosts = [
  {
    image: "./img/post.jpg",
    date: "2025-03-22",
    title: "Ninja Veggie Slice Turns Cutting Into a Combat Artform",
    text: "Precision, combos, and flying carrots — the slicing revolution is here.",
    fullText: `
Ninja Veggie Slice throws players into a hyper-stylized dojo where vegetables fight back — and your blade is your only ally.<br><br>

Slice enemy waves, chain flawless combos, and unlock blade skills to battle boss-level produce in fast-paced arcade combat.<br><br>

Choose from themed arenas like rooftop gardens, bamboo kitchens, and ancient market stalls — each with dynamic hazards and boost zones.<br><br>

It’s not just slicing — it’s slicing *strategically*. Time your cuts. Chain your strikes. Become a slicing master.
    `,
  },
  {
    image: "./img/post.jpg",
    date: "2025-02-27",
    title: "Top Slicers Flex Precision and Style in Ninja Veggie Slice",
    text: "Competitive combos and legendary blades define the leaderboard elites.",
    fullText: `
At the top of the GamingStrategyArena.com leaderboards, it’s all about clean cuts and combo mastery.<br><br>

Players are showcasing mythic blades like the Dragon Cleaver and the Wasabi Fang — each with unique slicing trails and power boosts.<br><br>

Female ninjas like “Sakura Slicer” and “Tofu Takedown” are dominating with rapid-fire techniques and dodge-dash flourishes.<br><br>

In this dojo, it’s not just speed that wins — it’s precision, grace, and knowing when *not* to swing.
    `,
  },
  {
    image: "./img/post.jpg",
    date: "2025-01-25",
    title: "Ninja Veggie Slice Clips Go Viral on GamingStrategyArena",
    text: "Combo carnage, mid-air turnips, and ultra-clean executions light up the feeds.",
    fullText: `
From triple-slice aerials to last-second watermelon blocks, Ninja Veggie Slice is dominating creator platforms.<br><br>

With cinematic slow-mo, combo counters, and multi-angle replay tools, content creators are putting on a true slicing spectacle.<br><br>

Hashtags like #SliceStorm and #NoMissMaster are climbing TikTok and Twitch charts.<br><br>

Want your moves featured? Record your round, edit your flair, and share it with the slicing community on GamingStrategyArena.com.
    `,
  },
  {
    image: "./img/post.jpg",
    date: "2025-04-25",
    title: "Hidden Knives & Secret Arenas Found in Ninja Veggie Slice",
    text: "Only the sharpest eyes find the forbidden blades and ancient gardens.",
    fullText: `
Dedicated players are unlocking rare blades, mystical food spirits, and hidden challenge maps tucked inside the game’s core.<br><br>

Legends speak of “The Lotus Blade” — a katana that can only be earned by slicing 10,000 veggies with no misses. Others search for the “Silent Kitchen,” a ghostly arena hidden behind the training menu.<br><br>

Hidden achievements, environmental clues, and coded carrot carvings are just the beginning.<br><br>

If you crave mastery — Ninja Veggie Slice has secrets sharp enough to cut through time.
    `,
  },
];


const articlesList = document.getElementById("news-list");

articlesPosts.forEach((post, index) => {
  const li = document.createElement("li");
  li.classList.add("news-box");

  li.innerHTML = `
    <div class="news-meta">
      <span> ${new Date(post.date).toDateString()}</span>
    </div>
    <div>
    <div class="news-img">
      <img src="${post.image}" alt="${post.title}" />
    </div>
    <h3 class="news-title">${post.title}</h3>
    <p class="news-text short-text">${post.text}</p>
    <p class="news-text full-text" style="display: none;">${post.fullText}</p>
    <button class="read-more-btn" data-index="${index}">Read more</button>
    </div>
  `;

  articlesList.appendChild(li);
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("read-more-btn")) {
    const btn = e.target;
    const card = btn.closest(".news-box");
    const shortText = card.querySelector(".short-text");
    const fullText = card.querySelector(".full-text");

    const isOpen = fullText.style.display === "block";

    fullText.style.display = isOpen ? "none" : "block";
    shortText.style.display = isOpen ? "block" : "none";
    btn.textContent = isOpen ? "Read more" : "Show less";
  }
});
