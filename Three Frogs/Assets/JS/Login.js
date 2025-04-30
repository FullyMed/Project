// ===============================
// JS for Login.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.classList.remove("hidden");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      fetch("Assets/PHP/login.php", {
        method: "POST",
        body: formData,
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.text();
        })
        .then(text => {
          try {
            const result = JSON.parse(text);
            if (result.success) {
              alert("Login successful!");
              window.location.href = "index.html";
            } else {
              errorMessage.textContent = result.error || "Invalid email or password.";
              errorMessage.classList.remove("hidden");
            }
          } catch (e) {
            console.error("Failed to parse JSON:", text);
            errorMessage.textContent = "Server error: Invalid response from server. Please try again later.";
            errorMessage.classList.remove("hidden");
          }
        })
        .catch(err => {
          console.error("Error during login:", err);
          errorMessage.textContent = "Server error: " + err.message + ". Please try again later.";
          errorMessage.classList.remove("hidden");
        });
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