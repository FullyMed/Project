document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const resultBox = document.getElementById("loginResult");
  const errorMessage = document.getElementById("errorMessage");
  const viewMorePrompt = document.getElementById("viewMorePrompt");

  let loginAttempts = 0;

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const forgotPrompt = document.getElementById("viewMorePrompt");

      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }

      if (!validateEmail(email)) {
        resultBox.innerHTML = `<p style="color:red;"><strong>Invalid email format.</strong></p>`;
        return;
      }

      if (password.length < 8) {
        resultBox.innerHTML = `<p style="color:red;"><strong>Password must be at least 8 characters long.</strong></p>`;
        return;
      }

      const formData = new FormData(loginForm);

      try {
        const response = await fetch("Assets/PHP/login.php", {
          method: "POST",
          body: formData,
          credentials: "include"
        });

        const result = await response.json();

        if (result.success) {
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          loginAttempts++;

          errorMessage.textContent = result.error || "Invalid email or password.";
          errorMessage.classList.remove("hidden");

          if (loginAttempts >= 2 && forgotPrompt) {
            console.log("✅ 2x gagal login. Menampilkan tombol Forgot Password.");
            forgotPrompt.classList.add("active");
          } else {
            console.log(`Login attempt: ${loginAttempts}`);
          }
        }
      } catch (err) {
        console.error("Error during login:", err);
        errorMessage.textContent = "Server error: " + err.message;
        errorMessage.classList.remove("hidden");
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