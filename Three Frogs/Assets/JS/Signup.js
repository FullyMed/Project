// ===============================
// JS for Signup.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
  
    if (signupForm) {
      signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const avatar = document.querySelector('input[name="avatar"]:checked')?.value || "default.jpg";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isEmailUsed = users.some(user => user.email === email);
  
        if (isEmailUsed) {
          document.getElementById("signupResult").innerHTML = `
            <p style="color:red;"><strong>Email already registered.</strong></p>
          `;
        } else {
          const newUser = { name, email, password, avatar };
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
  
          localStorage.setItem("loggedInUser", JSON.stringify(newUser));

          document.getElementById("signupResult").innerHTML = `
            <h3>Sign Up Successful!</h3>
            <p>Welcome, <strong>${name}</strong>. Redirecting to homepage...</p>
          `;
  
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
  
          signupForm.reset();
        }
      });
    }
  });
  
  // ===============================
  // Toggle Show/Hide Password
  // ===============================
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleSignupPassword");
    const passwordInput = document.getElementById("signupPassword");
  
    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener("click", () => {
        const isVisible = passwordInput.type === "text";
        passwordInput.type = isVisible ? "password" : "text";
        toggleBtn.textContent = isVisible ? "👁️" : "🙈";
      });
    }
  });