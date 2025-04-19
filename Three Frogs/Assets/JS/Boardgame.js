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
      description: "Trade, build, and settle your way to victory!",
      tags: ["Resource Management", "Trading", "Dice Rolling"]
    },
    {
      name: "UNO",
      category: "Card Game",
      players: "2-10",
      duration: "15-30 min",
      image: "Assets/Images/UNO.webp",
      description: "Fast-paced game where matching colors and numbers rules.",
      tags: ["Hand Management", "Color Matching", "Shedding"]
    },
    {
      name: "Monopoly",
      category: "Family",
      players: "2-6",
      duration: "120 min",
      image: "Assets/Images/Monopoly.avif",
      description: "Buy, trade, and bankrupt your opponents!",
      tags: ["Roll and Move", "Economic", "Player Elimination"]
    },
    {
      name: "Carcassonne",
      category: "Family",
      players: "2-5",
      duration: "45 min",
      image: "Assets/Images/Carcassonne.jpg",
      description: "Build cities and claim roads with strategic tiles.",
      tags: ["Tile Placement", "Area Control"]
    },
    {
      name: "Codenames",
      category: "Word Game",
      players: "4-8",
      duration: "15 min",
      image: "Assets/Images/Codenames.jpg",
      description: "Guess the secret words using clever clues.",
      tags: ["Team-Based", "Communication", "Deduction"]
    },
    {
      name: "Ticket to Ride",
      category: "Family",
      players: "2-5",
      duration: "60 min",
      image: "Assets/Images/Ticket To Ride.jpg",
      description: "Collect train cards to claim routes across the map.",
      tags: ["Route Building", "Set Collection"]
    },
    {
      name: "Pandemic",
      category: "Cooperative",
      players: "2-4",
      duration: "45 min",
      image: "Assets/Images/Pandemic.webp",
      description: "Work together to stop global outbreaks!",
      tags: ["Action Point Allowance", "Hand Management", "Player Powers"]
    },
    {
      name: "Azul",
      category: "Abstract",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Azul.jpg",
      description: "Draft tiles to create stunning mosaic patterns.",
      tags: ["Pattern Building", "Drafting"]
    },
    {
      name: "7 Wonders",
      category: "Strategy",
      players: "3-7",
      duration: "30 min",
      image: "Assets/Images/7 Wonders.jpg",
      description: "Build an ancient city through science, war, and trade.",
      tags: ["Card Drafting", "Set Collection", "Engine Building"]
    },
    {
      name: "Exploding Kittens",
      category: "Party",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/Exploding Kittens.jpg",
      description: "A fast and hilarious game of feline destruction.",
      tags: ["Player Elimination", "Push Your Luck"]
    },
    {
      name: "Dixit",
      category: "Party",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/Dixit.jpg",
      description: "Use imagination to match beautiful surreal cards.",
      tags: ["Storytelling", "Voting", "Creativity"]
    },
    {
      name: "Jenga",
      category: "Dexterity",
      players: "1-8",
      duration: "15-20 min",
      image: "Assets/Images/Jenga.jpg",
      description: "Pull and stack wooden blocks without toppling the tower!",
      tags: ["Stacking", "Tension", "Hand-Eye Coordination"]
    },
    {
      name: "The Resistance",
      category: "Party",
      players: "5-10",
      duration: "30 min",
      image: "Assets/Images/The Resistance.jpg",
      description: "Uncover the spies in your midst through lies and deduction.",
      tags: ["Bluffing", "Social Deduction", "Hidden Roles"]
    },
    {
      name: "Dominion",
      category: "Strategy",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Dominion.jpg",
      description: "Build your deck and kingdom from a shared card pool.",
      tags: ["Deck-Building", "Card Drafting", "Engine Building"]
    },
    {
      name: "Welcome to Your Perfect Home",
      category: "Family",
      players: "1-100",
      duration: "25 min",
      image: "Assets/Images/Welcome to Your Perfect Home.jpg",
      description: "Plan the perfect suburban neighborhood with clever number placement.",
      tags: ["Flip and Write", "Number Placement"]
    },
    {
      name: "Wingspan",
      category: "Strategy",
      players: "1-5",
      duration: "40-70 min",
      image: "Assets/Images/Wingspan.jpg",
      description: "Attract birds and build powerful combos in a beautiful engine-building game.",
      tags: ["Engine Building", "Card Drafting", "Set Collection"]
    },
    {
      name: "Risk",
      category: "Strategy",
      players: "2-6",
      duration: "60-120 min",
      image: "Assets/Images/Risk.jpg",
      description: "Conquer the world one territory at a time through dice and strategy.",
      tags: ["Area Control", "Dice Rolling", "Elimination"]
    },
    {
      name: "Patchwork",
      category: "Abstract",
      players: "2",
      duration: "30 min",
      image: "Assets/Images/Patchwork.jpg",
      description: "Compete to build the most aesthetically pleasing quilt using Tetris-like pieces.",
      tags: ["Tile Placement", "Tetris-Like", "Resource Management"]
    },
    {
      name: "Secret Hitler",
      category: "Party",
      players: "5-10",
      duration: "45 min",
      image: "Assets/Images/Secret Hitler.jpg",
      description: "Deduce who is lying in this tense and strategic political thriller.",
      tags: ["Hidden Roles", "Bluffing", "Deduction"]
    },
    {
      name: "Camel Up",
      category: "Party",
      players: "2-8",
      duration: "30 min",
      image: "Assets/Images/Camel Up.webp",
      description: "Bet on racing camels and manipulate their positions in wild ways!",
      tags: ["Betting", "Racing", "Dice Rolling"]
    },
    {
      name: "Splendor",
      category: "Strategy",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Splendor.jpg",
      description: "Collect gems and attract nobles in this elegant and strategic game.",
      tags: ["Engine Building", "Set Collection", "Card Drafting"]
    },
    {
      name: "Love Letter",
      category: "Card Game",
      players: "2-4",
      duration: "20 min",
      image: "Assets/Images/Love Letter.jpg",
      description: "Use deduction and luck to deliver your love letter to the princess.",
      tags: ["Hand Management", "Deduction", "Player Elimination"]
    },
    {
      name: "Isle of Skye",
      category: "Strategy",
      players: "2-5",
      duration: "60 min",
      image: "Assets/Images/Isle of Skye.jpg",
      description: "Build your kingdom in the Scottish highlands through tile placement and clever pricing.",
      tags: ["Tile Placement", "Auction", "Economic"]
    },
    {
      name: "King of Tokyo",
      category: "Party",
      players: "2-6",
      duration: "30 min",
      image: "Assets/Images/King of Tokyo.jpg",
      description: "Battle monsters and roll dice to become the one and only King of Tokyo!",
      tags: ["Dice Rolling", "Player Elimination", "Push Your Luck"]
    },
    {
      name: "Tokaido",
      category: "Family",
      players: "2-5",
      duration: "45 min",
      image: "Assets/Images/Tokaido.jpg",
      description: "Take a peaceful journey through Japan, collecting souvenirs and experiences.",
      tags: ["Point to Point Movement", "Set Collection", "Relaxing"]
    },
    {
      name: "Cartographers",
      category: "Abstract",
      players: "1-100",
      duration: "30-45 min",
      image: "Assets/Images/Cartographers.jpg",
      description: "Draw maps and plan your kingdom while adapting to changing objectives.",
      tags: ["Flip and Write", "Map Drawing", "Pattern Building"]
    },
    {
      name: "The Mind",
      category: "Party",
      players: "2-4",
      duration: "15-20 min",
      image: "Assets/Images/The Mind.jpg",
      description: "Play cards in the right order—without talking. A game of timing and connection.",
      tags: ["Cooperative", "Hand Management", "Timing"]
    },
    {
      name: "Quacks of Quedlinburg",
      category: "Strategy",
      players: "2-4",
      duration: "45 min",
      image: "Assets/Images/Quacks of Quedlinburg.jpg",
      description: "Brew potions by pushing your luck and drawing ingredients from your bag.",
      tags: ["Bag Building", "Push Your Luck", "Engine Building"]
    },
    {
      name: "Hive",
      category: "Abstract",
      players: "2",
      duration: "20 min",
      image: "Assets/Images/Hive.png",
      description: "A bug-themed chess-like game where you surround the opponent’s queen bee.",
      tags: ["Abstract Strategy", "No Board", "Tactical Movement"]
    },
    {
      name: "MicroMacro: Crime City",
      category: "Deduction",
      players: "1-4",
      duration: "15-45 min",
      image: "Assets/Images/MicroMacro.jpg",
      description: "Solve crimes by searching through a giant illustrated city map.",
      tags: ["Observation", "Deduction", "Storytelling"]
    },
    {
      name: "Betrayal at House on the Hill",
      category: "Horror",
      players: "3-6",
      duration: "60 min",
      image: "Assets/Images/Betrayal at House on the Hill.jpg",
      description: "Explore a haunted house until one player turns traitor and the haunt begins.",
      tags: ["Modular Board", "Hidden Traitor", "Scenario-Based"]
    },
    {
      name: "Just One",
      category: "Party",
      players: "3-7",
      duration: "20 min",
      image: "Assets/Images/Just One.webp",
      description: "Cooperate to give one-word clues and guess the secret word. But duplicates are discarded!",
      tags: ["Word Game", "Cooperative", "Party"]
    },
    {
      name: "Cluedo",
      category: "Family",
      players: "3-6",
      duration: "45 min",
      image: "Assets/Images/Cluedo.jpg",
      description: "Solve the murder mystery by deducing who, where, and with what.",
      tags: ["Deduction", "Roll and Move", "Mystery"]
    },
    {
      name: "Onitama",
      category: "Abstract",
      players: "2",
      duration: "15-20 min",
      image: "Assets/Images/Onitama.jpg",
      description: "A fast-paced strategy game with martial arts-inspired movement patterns.",
      tags: ["Abstract Strategy", "Perfect Information", "Grid Movement"]
    },
    {
      name: "Terraforming Mars",
      category: "Strategy",
      players: "1-5",
      duration: "120 min",
      image: "Assets/Images/Terraforming Mars.jpg",
      description: "Lead a corporation to terraform the red planet through engine building and resource management.",
      tags: ["Engine Building", "Card Drafting", "Resource Management"]
    },
    {
      name: "Suspend",
      category: "Dexterity",
      players: "1-4",
      duration: "15-20 min",
      image: "Assets/Images/Suspend.webp",
      description: "Balance metal rods in a tension-filled test of nerves and precision.",
      tags: ["Balancing", "Hand-Eye Coordination", "Tension"]
    },
    {
      name: "Dead of Winter",
      category: "Thematic",
      players: "2-5",
      duration: "90-120 min",
      image: "Assets/Images/Dead of Winter.jpg",
      description: "Survive a zombie apocalypse with your group, but beware: someone may have a secret agenda.",
      tags: ["Hidden Traitor", "Cooperative", "Scenario-Based"]
    },
    {
      name: "Paperback",
      category: "Word Game",
      players: "2-5",
      duration: "45 min",
      image: "Assets/Images/Paperback.webp",
      description: "Build words using letter cards in this blend of deck-building and wordplay.",
      tags: ["Word Building", "Deck-Building", "Card Game"]
    },
    {
      name: "Forbidden Island",
      category: "Cooperative",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Forbidden Island.jpg",
      description: "Work together to retrieve treasures before the island sinks beneath the waves.",
      tags: ["Cooperative", "Action Point Allowance", "Tile Removal"]
    },
    {
      name: "Coup",
      category: "Bluffing",
      players: "2-6",
      duration: "15 min",
      image: "Assets/Images/Coup.jpg",
      description: "Use deception, deduction, and strategy to manipulate your way to power.",
      tags: ["Bluffing", "Player Elimination", "Hidden Roles"]
    },
    {
      name: "Wavelength",
      category: "Party",
      players: "2-12",
      duration: "30-45 min",
      image: "Assets/Images/Wavelength.jpg",
      description: "Give and guess clues on a hidden spectrum in this hilarious team game.",
      tags: ["Team-Based", "Communication", "Social"]
    },
    {
      name: "Labyrinth",
      category: "Family",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Labyrinth.jpg",
      description: "Shift the maze to find treasures and block opponents in this classic puzzle game.",
      tags: ["Tile Movement", "Maze", "Tactical"]
    },
    {
      name: "Santorini",
      category: "Abstract",
      players: "2-4",
      duration: "20 min",
      image: "Assets/Images/Santorini.jpg",
      description: "Build and block in a stunning 3D race to reach the top floor.",
      tags: ["Abstract Strategy", "Grid Movement", "God Powers"]
    },
    {
      name: "Great Western Trail",
      category: "Strategy",
      players: "2-4",
      duration: "75-150 min",
      image: "Assets/Images/Great Western Trail.webp",
      description: "Herd cattle, upgrade your engine, and build your legacy in the Old West.",
      tags: ["Deck-Building", "Route Building", "Economic"]
    },
    {
      name: "Junk Art",
      category: "Dexterity",
      players: "2-6",
      duration: "30 min",
      image: "Assets/Images/Junk Art.jpg",
      description: "Stack odd-shaped pieces to create artistic structures without toppling them.",
      tags: ["Balancing", "Stacking", "Quick Reflex"]
    },
    {
      name: "Arkham Horror: The Card Game",
      category: "Thematic",
      players: "1-2 (expandable)",
      duration: "60-120 min",
      image: "Assets/Images/Arkham Horror Card Game.jpg",
      description: "Investigate dark mysteries and battle cosmic horrors in this narrative-driven LCG.",
      tags: ["Deck Construction", "Campaign", "Horror"]
    },
    {
      name: "Trapwords",
      category: "Word Game",
      players: "4-8",
      duration: "30 min",
      image: "Assets/Images/Trapwords.jpg",
      description: "Guess the word without saying the trap words your opponents secretly chose!",
      tags: ["Team-Based", "Word Guessing", "Trap Mechanic"]
    },
    {
      name: "The Crew: The Quest for Planet Nine",
      category: "Cooperative",
      players: "2-5",
      duration: "20 min",
      image: "Assets/Images/The Crew_Planet Nine.jpg",
      description: "Complete tricky space missions with limited communication in this cooperative trick-taking game.",
      tags: ["Trick-Taking", "Mission-Based", "Limited Communication"]
    },
    {
      name: "Hanamikoji",
      category: "Card Game",
      players: "2",
      duration: "15-20 min",
      image: "Assets/Images/Hanamikoji.jpg",
      description: "Gain the favor of geishas through tactical card play and clever offerings.",
      tags: ["Hand Management", "Area Control", "Tug of War"]
    },
    {
      name: "Spyfall",
      category: "Bluffing",
      players: "3-8",
      duration: "15 min",
      image: "Assets/Images/Spyfall.webp",
      description: "Find the spy among you—or if you're the spy, figure out where you are!",
      tags: ["Social Deduction", "Bluffing", "Hidden Roles"]
    },    
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
      const tagsHtml = game.tags ? game.tags.map(tag => `<span class='tag'>${tag}</span>`).join(" ") : "";
      card.innerHTML = `
        <img src="${game.image}" alt="${game.name}" />
        <div class="info">
          <h3>${game.name}</h3>
          <p>Category: ${game.category}</p>
          <div class="tags">${tagsHtml}</div>
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
    const shuffled = boardgames.sort(() => 0.5 - Math.random());
    const toDisplay = shuffled.slice(0, maxToShow);
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