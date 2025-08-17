// Contact form handling

class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.submitBtn = document.getElementById("contact-submit");
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.textContent = "Sending...";
    }

    const formData = new FormData(this.form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    this.showMessage(
      "Thank you for your message! We'll get back to you soon.",
      "success"
    );

    // Reset form
    this.form.reset();

    if (this.submitBtn) {
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = "Send Message";
    }
  }

  showMessage(message, type) {
    const messageEl = document.createElement("div");
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;

    this.form.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContactForm();
});
