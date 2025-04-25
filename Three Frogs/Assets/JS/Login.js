// ===============================
// JS for Login.html (with PHP backend)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const resultBox = document.getElementById("loginResult");

      try {
        const response = await fetch("login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
          localStorage.setItem("loggedInUser", JSON.stringify(result.user));

          resultBox.innerHTML = `
            <h3>Login Successful!</h3>
            <p>Welcome back, <strong>${result.user.name}</strong>. Redirecting to homepage...</p>
          `;

          setTimeout(() => window.location.href = "index.html", 1500);
          loginForm.reset();
        } else {
          resultBox.innerHTML = `
            <p style="color:red;"><strong>${result.error || "Invalid email or password."}</strong></p>
            <p style="margin-top: 8px;">
              <a href="Forgot-password.html" style="color: #2563eb; font-weight: bold;">Forgot your password?</a>
            </p>
          `;
        }
      } catch (error) {
        resultBox.innerHTML = `<p style="color:red;"><strong>Server error. Please try again later.</strong></p>`;
        console.error(error);
      }
    });
  }
});

// ===============================
// Toggle Show/Hide Password
// ===============================
document.addEventListener("DOMContentLoaded", () => {
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