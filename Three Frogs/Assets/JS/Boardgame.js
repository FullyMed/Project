// ===============================
// JS for Boardgame.html
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
      image: "Assets/Images/Catan.avif"
    },
    {
      name: "UNO",
      category: "Card Game",
      players: "2-10",
      duration: "15-30 min",
      image: "Assets/Images/UNO.jpg"
    },
    {
      name: "Monopoly",
      category: "Economy",
      players: "2-6",
      duration: "120 min",
      image: "Assets/Images/Monopoly.avif"
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
      image: "Assets/Images/Ticket To Ride.jpg"
    },
    {
      name: "Pandemic",
      category: "Co-op",
      players: "2-4",
      duration: "45 min",
      image: "Assets/Images/Pandemic.webp"
    },
    {
      name: "Azul",
      category: "Abstract",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Azul.webp"
    },
    {
      name: "7 Wonders",
      category: "Card Drafting",
      players: "3-7",
      duration: "30 min",
      image: "Assets/Images/7 Wonders.avif"
    },
    {
      name: "Exploding Kittens",
      category: "Party",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/Exploding Kittens.webp"
    },
    {
      name: "Dixit",
      category: "Storytelling",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/Dixit.jpg"
    }
  ];

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


// ================================
// Dynamic Navbar Based on Login
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
// JS for Collection.html
// ===============================
if (window.location.pathname.includes("Collection.html")) {
  const isLoggedIn = localStorage.getItem("loggedInUser");
  if (!isLoggedIn) {
    alert("You must be logged in to view the full boardgame collection.");
    window.location.href = "Login.html";
  }
}