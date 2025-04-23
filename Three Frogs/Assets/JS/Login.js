// ===============================
// JS for Login.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const matchedUser = users.find(user => user.email === email && user.password === password);
  
        if (matchedUser) {
          localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
  
          document.getElementById("loginResult").innerHTML = `
            <h3>Login Successful!</h3>
            <p>Welcome back, <strong>${matchedUser.name}</strong>. Redirecting to homepage...</p>
          `;
  
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        } else {
          document.getElementById("loginResult").innerHTML = `
            <p style="color:red;"><strong>Invalid email or password.</strong></p>
            <p style="margin-top: 8px;">
              <a href="Forgot-password.html" style="color: #2563eb; font-weight: bold;">Forgot your password?</a>
            </p>
          `;
        }
  
        loginForm.reset();
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