// ===============================
// JS for Forgot-password.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const forgotForm = document.getElementById("forgotForm");
  const resultBox = document.getElementById("forgotResult");

  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("forgotEmail").value;
      const newPassword = document.getElementById("newPassword").value;

      try {
        const response = await fetch("forgot-password.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        });

        const result = await response.json();

        if (result.success) {
          resultBox.innerHTML = `
            <h3>Password Reset Successful!</h3>
            <p>Password for <strong>${email}</strong> has been updated.</p>
            <p>Redirecting to login page...</p>
          `;
          setTimeout(() => {
            forgotForm.reset();
            window.location.href = "Login.html";
          }, 1500);
        } else {
          resultBox.innerHTML = `<p style="color:red;">${result.error}</p>`;
        }
      } catch (err) {
        resultBox.innerHTML = `<p style="color:red;">Server error. Please try again later.</p>`;
        console.error(err);
      }
    });
  }
});

// ===============================
// Toggle Show/Hide Password
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const toggleForgotPassword = document.getElementById("toggleForgotPassword");
  const forgotPasswordInput = document.getElementById("newPassword");

  if (toggleForgotPassword && forgotPasswordInput) {
    toggleForgotPassword.addEventListener("click", () => {
      const type = forgotPasswordInput.getAttribute("type") === "password" ? "text" : "password";
      forgotPasswordInput.setAttribute("type", type);
      toggleForgotPassword.textContent = type === "password" ? "👁️" : "🙈";
    });
  }
});