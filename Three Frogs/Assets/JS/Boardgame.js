// ===============================
// JS untuk Halaman Boardgame.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("boardgame-list");
  const seeMoreBox = document.getElementById("seeMoreBox");
  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  const boardgames = [
    {
      name: "Catan",
      category: "Strategy",
      players: "3-4",
      duration: "60 min",
      image: "Assets/Images/Catan.webp"
    },
    {
      name: "UNO",
      category: "Card Game",
      players: "2-10",
      duration: "15-30 min",
      image: "Assets/Images/UNO.png"
    },
    {
      name: "Monopoly",
      category: "Economy",
      players: "2-6",
      duration: "120 min",
      image: "Assets/Images/Monopoly.jpg"
    },
    {
      name: "Carcassonne",
      category: "Tile Placement",
      players: "2-5",
      duration: "45 min",
      image: "Assets/Images/Carcassonne.jpg"
    },
    {
      name: "Codenames",
      category: "Word",
      players: "4-8",
      duration: "15 min",
      image: "Assets/Images/Codenames.jpg"
    },
    {
      name: "Ticket to Ride",
      category: "Adventure",
      players: "2-5",
      duration: "60 min",
      image: "Assets/Images/TicketToRide.jpg"
    },
    {
      name: "Pandemic",
      category: "Co-op",
      players: "2-4",
      duration: "45 min",
      image: "Assets/Images/Pandemic.jpg"
    },
    {
      name: "Azul",
      category: "Abstract",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Azul.jpg"
    },
    {
      name: "7 Wonders",
      category: "Card Drafting",
      players: "3-7",
      duration: "30 min",
      image: "Assets/Images/7Wonders.jpg"
    },
    {
      name: "Exploding Kittens",
      category: "Party",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/ExplodingKittens.jpg"
    },
    {
      name: "Dixit",
      category: "Storytelling",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/Dixit.jpg"
    }
  ];

  // RENDER FUNCTION
  function renderBoardgames(data) {
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = `<p style="text-align:center;">No boardgames found.</p>`;
      return;
    }

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

  if (window.location.pathname.includes("Boardgame.html")) {
    const maxToShow = 10;
    const toDisplay = boardgames.slice(0, maxToShow);
    renderBoardgames(toDisplay);

    if (seeMoreBox) {
      seeMoreBox.classList.remove("hidden");
      if (isLoggedIn) {
        seeMoreBox.innerHTML = `
          <a href="Collection.html" class="see-more-button">See Other Boardgames</a>
        `;
      } else {
        seeMoreBox.innerHTML = `
          <p style="margin-top: 20px;">Please <a href="Login.html" style="color: #2563eb; font-weight: bold;">Login</a> or <a href="Signup.html" style="color: #2563eb; font-weight: bold;">Sign Up</a> to see the full collection.</p>
        `;
      }
    }
  }

  // COLLECTION PAGE: Show all + filter + search
  if (window.location.pathname.includes("Collection.html")) {
    renderBoardgames(boardgames);

    function filterBoardgames() {
      const keyword = searchInput.value.toLowerCase();
      const category = categoryFilter.value;

      const filtered = boardgames.filter(game => {
        const matchName = game.name.toLowerCase().includes(keyword);
        const matchCategory = category === "" || game.category === category;
        return matchName && matchCategory;
      });

      renderBoardgames(filtered);
    }

    if (searchInput && categoryFilter) {
      searchInput.addEventListener("input", filterBoardgames);
      categoryFilter.addEventListener("change", filterBoardgames);
    }
  }
});


// ===============================
// JS untuk Halaman Booking.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const popup = document.getElementById("authPopup");
  const bookingResult = document.getElementById("bookingResult");

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!currentUser && bookingForm) {
    bookingForm.style.display = "none";
    popup.classList.remove("hidden");
  }

  if (bookingForm && currentUser) {
    // Auto-fill email dan buat readonly
    const emailField = document.getElementById("email");
    if (emailField) {
      emailField.value = currentUser.email;
      emailField.readOnly = true;
    }

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const date = document.getElementById("date").value;
      const start = document.getElementById("start-time").value;
      const end = document.getElementById("end-time").value;
      const people = document.getElementById("people").value;
      const openTime = "12:00";
      const closeTime = "22:00";

      // Validasi: hanya izinkan tanggal booking hari ini ke depan
      const today = new Date().toISOString().split("T")[0];
      if (date < today) {
        bookingResult.innerHTML = `
          <p style="color:red;"><strong>Booking date cannot be in the past.</strong></p>
        `;
        return;
      }

      // ✅ Validasi waktu
      if (end <= start) {
        bookingResult.innerHTML = `
          <p style="color:red;"><strong>End time must be later than start time.</strong></p>
        `;
        return;
      }

      // Validasi jam buka: hanya boleh antara 12:00 - 22:00
      if (start < openTime || end > closeTime) {
        bookingResult.innerHTML = `
          <p style="color:red;"><strong>Booking must be between 12:00 and 22:00.</strong></p>
        `;
        return;
      }

      const bookingData = {
        name,
        email: currentUser.email, // Gunakan email dari user yang login
        date,
        start,
        end,
        people
      };

      const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      allBookings.push(bookingData);
      localStorage.setItem("bookings", JSON.stringify(allBookings));

      const result = `
        <h3>Booking Confirmed!</h3>
        <p>Thank you, <strong>${name}</strong>.</p>
        <p>Your booking on <strong>${date}</strong> from <strong>${start}</strong> to <strong>${end}</strong> for <strong>${people} people</strong> is received.</p>
        <p>We've sent a confirmation to <strong>${currentUser.email}</strong>.</p>
      `;

      bookingResult.innerHTML = result;
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
        // Simpan user ke localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        // Tampilkan pesan sukses
        document.getElementById("loginResult").innerHTML = `
          <h3>Login Successful!</h3>
          <p>Welcome back, <strong>${matchedUser.name}</strong>. Redirecting to homepage...</p>
        `;

        // Delay 1.5 detik lalu redirect
        setTimeout(() => {
          window.location.href = "Boardgame.html";
        }, 1500);
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


// ================================
// Navbar Dinamis Berdasarkan Login
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!navLinks) return; // Pastikan elemen ada sebelum lanjut

  navLinks.innerHTML = `
    <li><a href="Boardgame.html">Home</a></li>
    <li><a href="Booking.html">Booking</a></li>
    <li><a href="About.html">About</a></li>
    ${
      user
        ? `
      <li><a href="Dashboard.html">👤 ${user.name}</a></li>
      <li><a href="#" id="logoutLink">Logout</a></li>
    `
        : `
      <li><a href="Login.html">Login</a></li>
      <li><a href="Signup.html">Sign Up</a></li>
    `
    }
  `;

  // Logout handler
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "Boardgame.html";
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

      // Ambil avatar yang dipilih
      const avatar = document.querySelector('input[name="avatar"]:checked')?.value || "default.jpg";

      // Cek apakah email sudah terdaftar
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

        // Simpan user yang baru signup ke localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        // Tampilkan pesan sukses
        document.getElementById("signupResult").innerHTML = `
          <h3>Sign Up Successful!</h3>
          <p>Welcome, <strong>${name}</strong>. Redirecting to homepage...</p>
        `;

        // Delay 1.5 detik, lalu redirect
        setTimeout(() => {
          window.location.href = "Boardgame.html";
        }, 1500);

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


// ===============================
// JS untuk Halaman Dashboard.html
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (userInfo && loggedInUser) {
    userInfo.innerHTML = `
      <img src="${loggedInUser.avatar}" alt="User Avatar" style="width:100px;height:100px;border-radius:50%;margin-bottom:10px;">
      <p><strong>Name:</strong> ${loggedInUser.name}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
    `;
  } else if (userInfo && !loggedInUser) {
    userInfo.innerHTML = `
      <p style="color:red;">You are not logged in. Please <a href="Login.html">login</a>.</p>
    `;
    logoutBtn.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "Login.html";
    });
  }
});


// ===============================
// Proteksi Collection.html
// ===============================
if (window.location.pathname.includes("Collection.html")) {
  const isLoggedIn = localStorage.getItem("loggedInUser");
  if (!isLoggedIn) {
    alert("You must be logged in to view the full boardgame collection.");
    window.location.href = "Login.html";
  }
}