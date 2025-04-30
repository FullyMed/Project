document.addEventListener("DOMContentLoaded", async () => {
  // Function to check session via backend
  async function checkSession() {
    try {
      const response = await fetch("Assets/PHP/check_session.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const result = await response.json();
      return result.loggedIn ? result.user : null;
    } catch (error) {
      console.error("Session check failed:", error);
      return null;
    }
  }

  // Check if user is already logged in
  const currentUser = await checkSession();
  if (currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Handle login form submission
  const loginForm = document.getElementById("loginForm");
  const viewMorePrompt = document.getElementById("viewMorePrompt");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const resultBox = document.getElementById("loginResult");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      try {
        const response = await fetch("Assets/PHP/login.php", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          resultBox.innerHTML = `
            <h3>Login Successful!</h3>
            <p>Welcome back, <strong>${result.user.name}</strong>. Redirecting to homepage...</p>
          `;
          setTimeout(() => window.location.href = "index.html", 1500);
          loginForm.reset();
        } else {
          resultBox.innerHTML = `<p style="color:red;"><strong>${result.error || "Invalid email or password."}</strong></p>`;
          if (viewMorePrompt) {
            viewMorePrompt.style.display = "block";
          }
        }
      } catch (error) {
        resultBox.innerHTML = `<p style="color:red;"><strong>Server error. Please try again later.</strong></p>`;
        console.error("Login error:", error);
      }
    });
  }

  // Toggle Show/Hide Password
  const toggleBtn = document.getElementById("toggleLoginPassword");
  const passwordInput = document.getElementById("loginPassword");

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const isVisible = passwordInput.type === "text";
      passwordInput.type = isVisible ? "password" : "text";
      toggleBtn.textContent = isVisible ? "👁️" : "🙈";
    });
  }
});