// ================================
// Dynamic Navbar Based on Login
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.getElementById("navLinks");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!navLinks) return; // Pastikan elemen ada sebelum lanjut
  
    navLinks.innerHTML = `
      <li><a href="Boardgame.html">Home</a></li>
      <li><a href="Booking.html">Booking</a></li>
      <li><a href="About.html">About</a></li>
      ${
        user
          ? `
        <li><a href="Dashboard.html">👤 ${user.name}</a></li>
        <li><a href="#" id="logoutLink">Logout</a></li>
      `
          : `
        <li><a href="Login.html">Login</a></li>
        <li><a href="Signup.html">Sign Up</a></li>
      `
      }
    `;
  
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("You have been logged out.");
        window.location.href = "Boardgame.html";
      });
    }
  });