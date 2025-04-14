fetch("Data/Boardgames.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("boardgame-list");
    data.forEach((game) => {
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
  })
  .catch((error) => console.error("Gagal memuat data:", error));

// Booking form handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
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
      form.reset();
    });
  }
});

// Login form handler
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        document.getElementById("loginResult").innerHTML =
          `<p style="color: green;"><strong>Login berhasil!</strong> Selamat datang, ${user.name} 🐸</p>`;
        loginForm.reset();
      } else {
        document.getElementById("loginResult").innerHTML =
          `<p style="color: red;"><strong>Email atau password salah.</strong></p>`;
      }
    });
  }
});

// Sign Up form handler
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      // Simpan data ke localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        document.getElementById("signupResult").innerHTML =
          `<p style="color: red;"><strong>Email sudah terdaftar.</strong></p>`;
      } else {
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("signupResult").innerHTML =
          `<p style="color: green;"><strong>Registrasi berhasil!</strong> Silakan login.</p>`;
        signupForm.reset();
      }
    });
  }
});

// Forgot Password handler
document.addEventListener("DOMContentLoaded", function () {
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("forgotEmail").value;
      const newPassword = document.getElementById("newPassword").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user) => user.email === email);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("forgotResult").innerHTML =
          `<p style="color: green;"><strong>Password berhasil di-reset!</strong></p>`;
        forgotForm.reset();
      } else {
        document.getElementById("forgotResult").innerHTML =
          `<p style="color: red;"><strong>Email tidak ditemukan!</strong></p>`;
      }
    });
  }
});