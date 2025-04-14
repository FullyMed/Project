// ===============================
// JS untuk Halaman Boardgame.html
// ===============================
fetch("Data/Boardgames.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("boardgame-list");
    if (container) {
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
    }
  })
  .catch((error) => console.error("Gagal memuat data:", error));

// ===============================
// JS untuk Halaman Booking.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
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

      // Placeholder logic
      const message = `
        <h3>Login Successful!</h3>
        <p>Welcome back, <strong>${email}</strong>.</p>
      `;

      document.getElementById("loginResult").innerHTML = message;
      loginForm.reset();
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

      // Placeholder logic
      const message = `
        <h3>Sign Up Successful!</h3>
        <p>Welcome, <strong>${name}</strong>. Your account with email <strong>${email}</strong> has been created.</p>
      `;

      document.getElementById("signupResult").innerHTML = message;
      signupForm.reset();
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

      // Placeholder logic
      const message = `
        <h3>Password Reset Successful!</h3>
        <p>Your password for <strong>${email}</strong> has been updated.</p>
      `;

      document.getElementById("forgotResult").innerHTML = message;
      forgotForm.reset();
    });
  }
});