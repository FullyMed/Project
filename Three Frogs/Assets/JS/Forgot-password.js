// ===============================
// JS for Forgot-password.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const forgotForm = document.getElementById("forgotForm");
  
    if (forgotForm) {
      forgotForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = document.getElementById("forgotEmail").value;
        const newPassword = document.getElementById("newPassword").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const index = users.findIndex(user => user.email === email);
  
        if (index !== -1) {
          users[index].password = newPassword;
          localStorage.setItem("users", JSON.stringify(users));
  
          document.getElementById("forgotResult").innerHTML = `
            <h3>Password Reset Successful!</h3>
            <p>Password for <strong>${email}</strong> has been updated.</p>
            <p>Redirecting to login page...</p>
          `;
  
          setTimeout(() => {
            window.location.href = "Login.html";
          }, 1500);
        } else {
          document.getElementById("forgotResult").innerHTML = `
            <p style="color:red;"><strong>Email not found.</strong></p>
          `;
        }
  
        forgotForm.reset();
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