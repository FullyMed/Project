// ===============================
// JS untuk Halaman Boardgame.html
// ===============================
fetch("Three Frogs/Data/Boardgames.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("boardgame-list");
    const isLoggedIn = localStorage.getItem("loggedInUser") !== null;

    // Jumlah maksimum boardgame jika belum login
    const limit = isLoggedIn ? data.length : 6;
    const boardgamesToShow = data.slice(0, limit);

    if (container) {
      boardgamesToShow.forEach((game) => {
        const card = document.createElement("div");
        card.className = "boardgame-card";
        card.innerHTML = `
          <img src="${game.image}" alt="${game.name}" />
          <div class="info">
            <h3>${game.name}</h3>
            <p>Category: ${game.category}</p>
            <p>Players: ${game.players}</p>
            <p>Duration: ${game.duration}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }

    // Tampilkan prompt 'Lihat Boardgame Lainnya' jika belum login
    const promptBox = document.getElementById("viewMorePrompt");
    if (!isLoggedIn && promptBox) {
      promptBox.style.display = "block";
    }
  })
  .catch((error) => console.error("Gagal memuat data:", error));


// ===============================
// JS untuk Halaman Booking.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const popup = document.getElementById("authPopup");

  // Cek apakah user sudah login
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!currentUser && bookingForm) {
    bookingForm.style.display = "none";
    popup.classList.remove("hidden");
  }

  if (bookingForm && currentUser) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const start = document.getElementById("start-time").value;
      const end = document.getElementById("end-time").value;
      const people = document.getElementById("people").value;

      const result = `
        <h3>Booking Confirmed!</h3>
        <p>Thank you, <strong>${name}</strong>.</p>
        <p>Your booking on <strong>${date}</strong> from <strong>${start}</strong> to <strong>${end}</strong> for <strong>${people} people</strong> is received.</p>
        <p>We’ve sent a confirmation to <strong>${email}</strong>.</p>
      `;

      document.getElementById("bookingResult").innerHTML = result;
      bookingForm.reset();
    });
  }
});


// ===============================
// JS untuk Halaman Login.html
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
        // Simpan user yang sedang login ke localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        const message = `
          <h3>Login Successful!</h3>
          <p>Welcome back, <strong>${matchedUser.name}</strong>.</p>
        `;
        document.getElementById("loginResult").innerHTML = message;
      } else {
        document.getElementById("loginResult").innerHTML = `
          <p style="color:red;"><strong>Invalid email or password.</strong></p>
        `;
      }

      loginForm.reset();
    });
  }
});

// ===============================
// Toggle Show/Hide Password - Login Form
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


// ===============================
// JS untuk Halaman Signup.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      // Cek apakah email sudah terdaftar
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const isEmailUsed = users.some(user => user.email === email);

      if (isEmailUsed) {
        document.getElementById("signupResult").innerHTML = `
          <p style="color:red;"><strong>Email already registered.</strong></p>
        `;
      } else {
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Simpan user yang baru signup ke localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        const message = `
          <h3>Sign Up Successful!</h3>
          <p>Welcome, <strong>${name}</strong>. Your account has been created.</p>
        `;
        document.getElementById("signupResult").innerHTML = message;
        signupForm.reset();
      }
    });
  }
});

// ===============================
// Toggle Show/Hide Password - Signup Form
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


// ===============================
// JS untuk Halaman Forgot-password.html
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
        `;
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
// Toggle Show/Hide Password - Forgot Password
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