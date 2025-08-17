const disclaimerContent = {
    title: "Disclaimer",
    sections: [
      {
        heading: "General Information",
        paragraphs: [
          `The information provided on this website <strong>GamingStrategyArena.com</strong> (collectively, the “Site”) is for general informational purposes only.
           All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied,
           regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.`
        ],
      },
      {
        heading: "Professional Advice",
        paragraphs: [
          `The Site cannot and does not contain professional advice. Any information provided is for general informational and educational purposes only
           and is not a substitute for professional advice. Accordingly, before taking any actions based on such information, we encourage you to consult
           with the appropriate professionals. We do not provide any kind of professional advice.`
        ],
      },
      {
        heading: "External Links Disclaimer",
        paragraphs: [
          `The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties
           or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy,
           adequacy, validity, reliability, availability, or completeness by us.`,
          `We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites
           linked through the Site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible
           for monitoring any transaction between you and third-party providers of products or services.`
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          `Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Site or reliance
           on any information provided on the Site. Your use of the Site and your reliance on any information on the Site is solely at your own risk.`
        ],
      },
      {
        heading: "“As Is” and “As Available” Disclaimer",
        paragraphs: [
          `The Site is provided on an “as is” and “as available” basis without any warranties of any kind, either express or implied, including, but not limited to,
           the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
          `We do not warrant that the Site will function uninterrupted, secure, or available at any particular time or location,
           or that any errors or defects will be corrected.`
        ],
      },
      {
        heading: "Changes to This Disclaimer",
        paragraphs: [
          `We reserve the right to amend this Disclaimer at any time without any prior notice. It is your responsibility to review this Disclaimer
           periodically to stay informed of updates.`
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `If you have questions about this Disclaimer, please contact us.`
        ],
      },
    ],
  };

  function renderDisclaimerSection() {
    const container = document.querySelector(".disclaimer-section .container");
    const titleEl = document.createElement("h2");
    titleEl.classList.add("title");
    titleEl.textContent = disclaimerContent.title;
    container.appendChild(titleEl);
  
    disclaimerContent.sections.forEach((section) => {
      const block = document.createElement("div");
      block.classList.add("disclaimer-block");
  
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
  
  document.addEventListener("DOMContentLoaded", renderDisclaimerSection);
  