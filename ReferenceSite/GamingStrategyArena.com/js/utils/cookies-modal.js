function showCookieModal() {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
  
    if (!cookieAccepted) {
      document.getElementById("cookie-modal").style.display = "block";
    }
  
    document.getElementById("accept-cookies").addEventListener("click", () => {
      localStorage.setItem("cookieAccepted", "true");
      document.getElementById("cookie-modal").style.display = "none";
    });
  }
  
  document.addEventListener("DOMContentLoaded", showCookieModal);
  