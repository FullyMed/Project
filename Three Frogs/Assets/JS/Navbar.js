// ================================
// Dynamic Navbar Based on Login
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const scrollBtn = document.getElementById("scrollTopBtn");
  
  if (!navLinks) return;
  
  fetch("Assets/PHP/check_session.php")
  .then(res => res.json())
  .then(data => {
    //  navLinks.innerHTML = `
    //     <li><a href="/">Home</a></li>
      navLinks.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="Booking.html">Booking</a></li>
        <li><a href="About.html">About</a></li>
        ${
          data.loggedIn
            ? `
          <li><a href="Dashboard.html">👤 ${data.name}</a></li>
          <li><a href="Assets/PHP/logout.php">Logout</a></li>
        `
            : `
          <li><a href="Login.html">Login</a></li>
          <li><a href="Signup.html">Sign Up</a></li>
        `
        }
      `;
    });

  // Scroll to top button
  window.onscroll = function () {
    if (scrollBtn && (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)) {
      scrollBtn.style.display = "block";
    } else if (scrollBtn) {
      scrollBtn.style.display = "none";
    }
  };

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});