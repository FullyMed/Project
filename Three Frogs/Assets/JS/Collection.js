// ===============================
// JS for Collection.html
// ===============================
if (window.location.pathname.includes("Collection.html")) {
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (!isLoggedIn) {
      alert("You must be logged in to view the full boardgame collection.");
      window.location.href = "Login.html";
    }
  }