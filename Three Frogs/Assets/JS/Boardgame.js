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
      image: "Assets/Images/Catan.jpg",
      description: "Trade, build, and settle your way to victory!"
    },
    {
      name: "UNO",
      category: "Card Game",
      players: "2-10",
      duration: "15-30 min",
      image: "Assets/Images/UNO.webp",
      description: "Fast-paced game where matching colors and numbers rules."
    },
    {
      name: "Monopoly",
      category: "Economy",
      players: "2-6",
      duration: "120 min",
      image: "Assets/Images/Monopoly.avif",
      description: "Buy, trade, and bankrupt your opponents!"
    },
    {
      name: "Carcassonne",
      category: "Tile Placement",
      players: "2-5",
      duration: "45 min",
      image: "Assets/Images/Carcassonne.jpg",
      description: "Build cities and claim roads with strategic tiles."
    },
    {
      name: "Codenames",
      category: "Word",
      players: "4-8",
      duration: "15 min",
      image: "Assets/Images/Codenames.jpg",
      description: "Guess the secret words using clever clues."
    },
    {
      name: "Ticket to Ride",
      category: "Adventure",
      players: "2-5",
      duration: "60 min",
      image: "Assets/Images/Ticket To Ride.jpg",
      description: "Collect train cards to claim routes across the map."
    },
    {
      name: "Pandemic",
      category: "Co-op",
      players: "2-4",
      duration: "45 min",
      image: "Assets/Images/Pandemic.webp",
      description: "Work together to stop global outbreaks!"
    },
    {
      name: "Azul",
      category: "Abstract",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Azul.jpg",
      description: "Draft tiles to create stunning mosaic patterns."
    },
    {
      name: "7 Wonders",
      category: "Card Drafting",
      players: "3-7",
      duration: "30 min",
      image: "Assets/Images/7 Wonders.jpg",
      description: "Build an ancient city through science, war, and trade."
    },
    {
      name: "Exploding Kittens",
      category: "Party",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/Exploding Kittens.jpg",
      description: "A fast and hilarious game of feline destruction."
    },
    {
      name: "Dixit",
      category: "Storytelling",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/Dixit.jpg",
      description: "Use imagination to match beautiful surreal cards."
    },
    {
      name: "Jenga",
      category: "Dexterity",
      players: "1-8",
      duration: "15-20 min",
      image: "Assets/Images/Jenga.jpg",
      description: "Pull and stack wooden blocks without toppling the tower!"
    },
    {
      name: "The Resistance",
      category: "Bluffing / Social Deduction",
      players: "5-10",
      duration: "30 min",
      image: "Assets/Images/The Resistance.jpg",
      description: "Uncover the spies in your midst through lies and deduction."
    },
    {
      name: "Dominion",
      category: "Deck-Building",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Dominion.jpg",
      description: "Build your deck and kingdom from a shared card pool."
    },
    {
      name: "Welcome To...",
      category: "Roll and Write",
      players: "1-100",
      duration: "25 min",
      image: "Assets/Images/Welcome To.jpg",
      description: "Plan the perfect suburban neighborhood with clever number placement."
    },
    {
      name: "Wingspan",
      category: "Engine Building",
      players: "1-5",
      duration: "40-70 min",
      image: "Assets/Images/Wingspan.jpg",
      description: "Attract birds and build powerful combos in a beautiful engine-building game."
    },
    {
      name: "Risk",
      category: "Area Control",
      players: "2-6",
      duration: "60-120 min",
      image: "Assets/Images/Risk.jpg",
      description: "Conquer the world one territory at a time through dice and strategy."
    },
    {
      name: "Patchwork",
      category: "Abstract",
      players: "2",
      duration: "30 min",
      image: "Assets/Images/Patchwork.jpg",
      description: "Compete to build the most aesthetically pleasing quilt using Tetris-like pieces."
    },
    {
      name: "Secret Hitler",
      category: "Hidden Role",
      players: "5-10",
      duration: "45 min",
      image: "Assets/Images/Secret Hitler.jpg",
      description: "Deduce who is lying in this tense and strategic political thriller."
    },
    {
      name: "Camel Up",
      category: "Racing / Betting",
      players: "2-8",
      duration: "30 min",
      image: "Assets/Images/Camel Up.jpg",
      description: "Bet on racing camels and manipulate their positions in wild ways!"
    },
    {
      name: "Splendor",
      category: "Engine Building",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Splendor.jpg",
      description: "Collect gems and attract nobles in this elegant and strategic game."
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
        </div>
        <div class="details">
          <p><strong>Players:</strong> ${game.players}</p>
          <p><strong>Duration:</strong> ${game.duration}</p>
          <p>${game.description}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // ================= Boardgame Page =================
  if (window.location.pathname.includes("Boardgame.html")) {
    const maxToShow = 10;
    const toDisplay = boardgames.slice(0, maxToShow);
    renderBoardgames(toDisplay);

    if (seeMoreBox) {
      seeMoreBox.classList.remove("hidden");
      seeMoreBox.innerHTML = isLoggedIn
        ? `<a href="Collection.html" class="see-more-button">See Other Boardgames</a>`
        : `<p style="margin-top: 20px;">Please <a href="Login.html" style="color: #2563eb; font-weight: bold;">Login</a> or <a href="Signup.html" style="color: #2563eb; font-weight: bold;">Sign Up</a> to see the full collection.</p>`;
    }
  }

  // ================= Collection Page =================
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