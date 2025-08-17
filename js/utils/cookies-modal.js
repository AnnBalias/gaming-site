// Cookie modal utility

function showCookieModal() {
  const cookieAccepted = localStorage.getItem("cookieAccepted");

  if (!cookieAccepted) {
    const cookieBar = document.getElementById("cookie-bar");
    if (cookieBar) {
      cookieBar.style.display = "block";
    }
  }

  // Accept cookies
  const acceptBtn = document.getElementById("cookie-accept");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieAccepted", "true");
      const cookieBar = document.getElementById("cookie-bar");
      if (cookieBar) {
        cookieBar.style.display = "none";
      }
    });
  }

  // Decline cookies
  const declineBtn = document.getElementById("cookie-decline");
  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieAccepted", "false");
      const cookieBar = document.getElementById("cookie-bar");
      if (cookieBar) {
        cookieBar.style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", showCookieModal);
