// ===============================
// JS for Login.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const resultBox = document.getElementById("loginResult");
  const errorMessage = document.getElementById("errorMessage");

  console.log("loginForm: ", loginForm);
  console.log("loginEmail: ", document.getElementById("loginEmail"));
  console.log("loginPassword: ", document.getElementById("loginPassword"));

  if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      console.log("email: ", email);
      console.log("password: ", password);

      // Form validation
      if (!validateEmail(email)) {
        resultBox.innerHTML = `<p style="color:red;"><strong>Invalid email format.</strong></p>`;
        return;
      }

      if (password.length < 8) {
        resultBox.innerHTML = `<p style="color:red;"><strong>Password must be at least 8 characters long.</strong></p>`;
        return;
      }

      const formData = new FormData(loginForm);

      fetch("Assets/PHP/login.php", {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            alert("Login successful!");
            window.location.href = "index.html";
          } else {
            errorMessage.textContent = result.error || "Invalid email or password.";
            errorMessage.classList.remove("hidden");
          }
        })
        .catch(err => {
          console.error("Error during login:", err);
          errorMessage.textContent = "Server error: " + err.message;
          errorMessage.classList.remove("hidden");
        });      
    });
  }

  // try {
  //       const response = await fetch("Assets/PHP/login.php", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const result = await response.json();

  //       if (result.success) {
  //         resultBox.innerHTML = `
  //           <h3>Login Successful!</h3>
  //           <p>Welcome back, <strong>${result.user.name}</strong>. Redirecting...</p>
  //         `;
  //         setTimeout(() => window.location.href = "index.html", 1500);
  //       } else {
  //         resultBox.innerHTML = `<p style="color:red;"><strong>${result.error || "Login failed."}</strong></p>`;
  //       }
  //     } catch (err) {
  //       resultBox.innerHTML = `<p style="color:red;"><strong>Server error. Please try again later.</strong></p>`;
  //       console.error("Login error:", err);
  //     }
  //   });
  // }

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