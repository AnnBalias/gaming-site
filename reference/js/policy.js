const privacyPolicyContent = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "Introduction",
      paragraphs: [
        `We  <strong>GamingStrategyArena.com</strong> are  committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto  (collectively, the “Site”). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.`,
      ],
    },
    {
      heading: "Information We Collect",
      paragraphs: [
        `We may collect information about you in a variety of ways. The information we may collect on the Site includes:`,
      ],
    },
    {
      heading: "Personal Data",
      paragraphs: [
        `Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat or message boards.`,
      ],
    },
    {
      heading: "Derivative Data",
      paragraphs: [
        `Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.`,
      ],
    },
    {
      heading: "Financial Data",
      paragraphs: [
        `Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.`,
      ],
    },
    {
      heading: "Use of Your Information",
      paragraphs: [
        `Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:`,
        `• Create and manage your account.<br>
           • Process transactions and send confirmations.<br>
           • Respond to customer service requests.<br>
           • Send administrative information such as updates, security alerts, and support.<br>
           • Deliver targeted advertising and promotions.<br>
           • Improve our website and user experience.`,
      ],
    },
    {
      heading: "Disclosure of Your Information",
      paragraphs: [
        `We may share information we have collected about you in certain situations. Your information may be disclosed as follows:`,
      ],
    },
    {
      heading: "By Law or to Protect Rights",
      paragraphs: [
        `If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.`,
      ],
    },
    {
      heading: "Third-Party Service Providers",
      paragraphs: [
        `We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.`,
      ],
    },
    {
      heading: "Affiliates",
      paragraphs: [
        `We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.`,
      ],
    },
    {
      heading: "Other Third Parties",
      paragraphs: [
        `We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law.`,
      ],
    },
    {
      heading: "Security of Your Information",
      paragraphs: [
        `We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against interception or misuse.`,
      ],
    },
    {
      heading: "Policy for Children",
      paragraphs: [
        `We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us.`,
      ],
    },
    {
      heading: "Options Regarding Your Information",
      paragraphs: [
        `You may at any time review or change the information in your account or terminate your account by:`,
        `• Logging into your account settings and updating your account.<br>
           • Contacting us.`,
        `Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use, and/or comply with legal requirements.`,
      ],
    },
    {
      heading: "Emails and Communications",
      paragraphs: [
        `If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:`,
        `• Following the unsubscribe instructions provided in the email.<br>
           • Contacting us.`,
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        `If you have questions or comments about this Privacy Policy, please contact us.`,
      ],
    },
  ],
};

function renderPrivacyPolicy() {
  const container = document.getElementById("privacy-policy-container");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("title");
  titleEl.textContent = privacyPolicyContent.title;
  container.appendChild(titleEl);

  privacyPolicyContent.sections.forEach((section) => {
    const block = document.createElement("div");
    block.classList.add("privacy-policy-block");

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

document.addEventListener("DOMContentLoaded", renderPrivacyPolicy);
