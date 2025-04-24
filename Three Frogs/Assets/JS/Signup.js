// ===============================
// JS for Signup.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
  
    if (signupForm) {
      signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();
      
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const avatar = document.querySelector('input[name="avatar"]:checked')?.value || "Assets/Images/Avatars/Clam.jpg";
      
        const resultBox = document.getElementById("signupResult");
      
        try {
          const response = await fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, avatar }),
          });
      
          const result = await response.json();
      
          if (result.success) {
            resultBox.innerHTML = `
              <h3>Sign Up Successful!</h3>
              <p>Welcome, <strong>${name}</strong>. Redirecting to homepage...</p>
            `;
            setTimeout(() => window.location.href = "index.html", 1500);
            signupForm.reset();
          } else {
            resultBox.innerHTML = `<p style="color:red;"><strong>${result.error || "Signup failed."}</strong></p>`;
          }
        } catch (err) {
          resultBox.innerHTML = `<p style="color:red;"><strong>Server error. Please try again later.</strong></p>`;
          console.error(err);
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