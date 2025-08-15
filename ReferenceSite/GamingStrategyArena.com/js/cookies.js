const cookiePolicyContent = {
  title: "Cookie Policy",
  sections: [
    {
      heading: "Introduction",
      paragraphs: [
        `This Cookie Policy outlines how we <strong>GamingStrategyArena.com</strong> use cookies and similar technologies to enhance your experience when visiting  (hereafter, the “Site”). It explains what cookies are, why we use them, and your rights to control their usage.`,
      ],
    },
    {
      heading: "What Are Cookies?",
      paragraphs: [
        `Cookies are small text files that are stored on your device when you visit a website. They are commonly used to ensure websites operate efficiently, enhance user experience, and collect data for reporting purposes.`,
      ],
    },
    {
      heading: "Types of Cookies We Use",
      paragraphs: [
        `<strong>Essential Cookies:</strong> Required for the website’s core functionality. They enable navigation and access to secure areas.`,
        `<strong>Performance Cookies:</strong> Help us understand how users interact with the website by collecting anonymous usage data.`,
        `<strong>Functional Cookies:</strong> Remember user preferences such as language, region, or login details to provide a more personalized experience.`,
        `<strong>Targeting Cookies:</strong> Deliver ads relevant to your interests, limit ad frequency, and help us measure ad campaign effectiveness.`,
      ],
    },
    {
      heading: "Why Do We Use Cookies?",
      paragraphs: [
        `We use cookies to:`,

        `• Ensure the website functions correctly<br>
         • Analyze usage data to improve performance<br>
         • Provide relevant content and advertising<br>
         • Remember your settings and preferences`,
      ],
    },
    {
      heading: "Your Choices Regarding Cookies",
      paragraphs: [
        `You can choose to accept or decline cookies through your browser settings. Please note that disabling cookies may impact the functionality and features available on our Site.`,
      ],
    },
    {
      heading: "Managing Cookies",
      paragraphs: [
        `Most browsers allow users to manage cookie preferences through settings. Below are links to guides for popular browsers:`,

        `• Google Chrome<br>
         • Mozilla Firefox<br>
         • Microsoft Edge<br>
         • Safari`,
      ],
    },
    {
      heading: "Updates to This Cookie Policy",
      paragraphs: [
        `We may revise this Cookie Policy occasionally to reflect changes in our practices or for legal and operational reasons. Please review it periodically to stay informed.`,
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        `If you have any questions or concerns about this Cookie Policy, feel free to reach out to us.`,
      ],
    },
  ],
};

function renderCookiePolicy() {
  const container = document.getElementById("cookie-policy-container");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("title");
  titleEl.textContent = cookiePolicyContent.title;
  container.appendChild(titleEl);

  cookiePolicyContent.sections.forEach((section) => {
    const block = document.createElement("div");
    block.classList.add("cookie-policy-block");

    const heading = document.createElement("h3");
    heading.textContent = section.heading;
    block.appendChild(heading);

    section.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.innerHTML = text;
      block.appendChild(p);
    });

    container.appendChild(block);
  });
}

document.addEventListener("DOMContentLoaded", renderCookiePolicy);
