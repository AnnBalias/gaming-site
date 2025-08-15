document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const modal = document.getElementById("form-modal");

  if (form.checkValidity()) {
    form.reset();
    modal.style.display = "flex";

    setTimeout(() => {
      modal.style.display = "none";
    }, 3000);
  }
});
