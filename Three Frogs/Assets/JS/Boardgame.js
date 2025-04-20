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
      name: "The Mind",
      category: "Party",
      players: "2-4",
      duration: "15-20 min",
      image: "Assets/Images/The Mind.jpg",
      description: "Play cards in the right order—without talking. A game of timing and connection.",
      tags: ["Cooperative", "Hand Management", "Timing"]
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
      name: "Great Western Trail",
      category: "Strategy",
      players: "2-4",
      duration: "75-150 min",
      image: "Assets/Images/Great Western Trail.webp",
      description: "Herd cattle, upgrade your engine, and build your legacy in the Old West.",
      tags: ["Deck-Building", "Route Building", "Economic"]
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
    {
      name: "Menace Among Us",
      category: "Bluffing",
      players: "4-8",
      duration: "45-60 min",
      image: "Assets/Images/Menace Among Us.jpg",
      description: "A hidden traitor game set in space where players work to fix their ship—or sabotage it.",
      tags: ["Hidden Roles", "Deduction", "Cooperative", "Bluffing"]
    },
    {
      name: "Hellapagos",
      category: "Cooperative",
      players: "3-12",
      duration: "20-30 min",
      image: "Assets/Images/Hellapagos.jpg",
      description: "Survive a shipwrecked island by working together... until resources run out!",
      tags: ["Cooperative", "Survival", "Negotiation", "Backstabbing"]
    },
    {
      name: "Dream Home",
      category: "Family",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Dream Home.jpg",
      description: "Design your ideal house by choosing cards and furnishing each room with style.",
      tags: ["Set Collection", "Drafting", "Family Friendly"]
    },
    {
      name: "Game of Cat and Mouth",
      category: "Dexterity",
      players: "2",
      duration: "10-15 min",
      image: "Assets/Images/Game of Cat and Mouth.jpg",
      description: "A fast-paced flicking battle to knock out your opponent’s balls with magnetic paws.",
      tags: ["Dexterity", "Flicking", "Fast-Paced"]
    },
    {
      name: "Baobab",
      category: "Dexterity",
      players: "2-4",
      duration: "15 min",
      image: "Assets/Images/Baobab.jpg",
      description: "Stack animals on a tree without letting them fall. Each type has a different rule!",
      tags: ["Stacking", "Animal Theme", "Party"]
    },
    {
      name: "Tapestry",
      category: "Strategy",
      players: "1-5",
      duration: "90-120 min",
      image: "Assets/Images/Tapestry.jpg",
      description: "Advance your civilization through eras of innovation and conquest in this grand strategy game.",
      tags: ["Civilization Building", "Engine Building", "Asymmetric Powers"]
    },
    {
      name: "Everdell",
      category: "Strategy",
      players: "1-4",
      duration: "40-80 min",
      image: "Assets/Images/Everdell.jpg",
      description: "Build a vibrant woodland city with critters and constructions in this beautiful tableau game.",
      tags: ["Worker Placement", "Tableau Building", "Card Drafting"]
    },
    {
      name: "Downforce",
      category: "Family",
      players: "2-6",
      duration: "30-45 min",
      image: "Assets/Images/Downforce.jpg",
      description: "Bid, race, and bet in a fast-paced Formula 1 style board game.",
      tags: ["Betting", "Hand Management", "Racing"]
    },
    {
      name: "My City",
      category: "Family",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/My City.jpg",
      description: "A legacy tile-laying game where players build a city that evolves over time.",
      tags: ["Legacy", "Tile Placement", "City Building"]
    },
    {
      name: "Barenpark",
      category: "Family",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Barenpark.jpg",
      description: "Build your own bear park by placing polyomino tiles to maximize space.",
      tags: ["Tile Placement", "Tetris-Like", "Set Collection"]
    },
    {
      name: "Blue Lagoon",
      category: "Family",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Blue Lagoon.jpg",
      description: "Explore islands and settle in this strategic area control game.",
      tags: ["Area Control", "Set Collection", "Abstract"]
    },
    {
      name: "Reef",
      category: "Abstract",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Reef.jpg",
      description: "Create colorful coral patterns in a vibrant underwater setting.",
      tags: ["Pattern Building", "Stacking", "Family Friendly"]
    },
    {
      name: "Wombat",
      category: "Family",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Wombat.jpg",
      description: "Help wombats dig and navigate their tunnels in this cute and clever game.",
      tags: ["Animal Theme", "Movement", "Kids"]
    },
    {
      name: "Marrakech",
      category: "Abstract",
      players: "2-4",
      duration: "20-30 min",
      image: "Assets/Images/Marrakech.jpg",
      description: "Place your carpets on the market and earn the most money in this tactical game.",
      tags: ["Tile Placement", "Area Influence", "Economic"]
    },
    {
      name: "Dragon Market",
      category: "Family",
      players: "2-4",
      duration: "30-45 min",
      image: "Assets/Images/Dragon Market.jpg",
      description: "Collect items by moving through a dynamic floating market filled with shifting boats.",
      tags: ["Grid Movement", "Pickup and Deliver", "Strategy"]
    },
    {
      name: "Quixo",
      category: "Abstract",
      players: "2 or 4",
      duration: "15-20 min",
      image: "Assets/Images/Quixo.jpg",
      description: "Align five of your symbols in a row by pushing and rotating blocks.",
      tags: ["Abstract Strategy", "Alignment", "Quick Play"]
    },
    {
      name: "Pylos",
      category: "Abstract",
      players: "2",
      duration: "20 min",
      image: "Assets/Images/Pylos.jpg",
      description: "Stack your spheres to complete the pyramid while conserving your pieces.",
      tags: ["Abstract Strategy", "3D", "Tactical"]
    },
    {
      name: "Game of Cat and Mouth",
      category: "Dexterity",
      players: "2",
      duration: "10-15 min",
      image: "Assets/Images/Game of Cat and Mouth.jpg",
      description: "Use a magnetic cat paw to fling balls at your opponent's side in a fast-paced battle.",
      tags: ["Flicking", "Dexterity", "Real-Time"]
    },
    {
      name: "Quoridor",
      category: "Abstract",
      players: "2-4",
      duration: "15-30 min",
      image: "Assets/Images/Quoridor.jpg",
      description: "Block your opponents and be the first to reach the other side of the board.",
      tags: ["Maze", "Blocking", "Abstract Strategy"]
    },
    {
      name: "Blokus",
      category: "Abstract",
      players: "2-4",
      duration: "20-30 min",
      image: "Assets/Images/Blokus.jpg",
      description: "Place as many of your pieces as you can while blocking your opponents in this strategic spatial game.",
      tags: ["Tile Placement", "Spatial Reasoning", "Abstract Strategy"]
    },
    {
      name: "Jaipur",
      category: "Card Game",
      players: "2",
      duration: "30 min",
      image: "Assets/Images/Jaipur.jpg",
      description: "A fast-paced card game of trading and tactics set in the Indian marketplace.",
      tags: ["Trading", "Set Collection", "Hand Management"]
    },
    {
      name: "Schotten Totten",
      category: "Card Game",
      players: "2",
      duration: "20 min",
      image: "Assets/Images/Schotten Totten.jpg",
      description: "Battle over stones using poker-style formations in this tactical 2-player duel.",
      tags: ["Hand Management", "Area Control", "Bluffing"]
    },
    {
      name: "Tacocat Spelled Backwards",
      category: "Party",
      players: "2",
      duration: "15-20 min",
      image: "Assets/Images/Tacocat Spelled Backwards.jpg",
      description: "A palindrome-powered tug-of-war game of clever duels and bluffing.",
      tags: ["Bluffing", "Card Game", "Humor"]
    },
    {
      name: "Raise Your Goblets",
      category: "Bluffing",
      players: "2-12",
      duration: "30-45 min",
      image: "Assets/Images/Raise Your Goblets.jpg",
      description: "Mix, poison, and toast as you try to eliminate your enemies without getting caught.",
      tags: ["Bluffing", "Deduction", "Party"]
    },
    {
      name: "Kingdomino",
      category: "Family",
      players: "2-4",
      duration: "15-20 min",
      image: "Assets/Images/Kingdomino.jpg",
      description: "Match and build your kingdom in this domino-style tile-laying game.",
      tags: ["Tile Placement", "Drafting", "Spatial"]
    },
    {
      name: "Kingdomino Origin",
      category: "Family",
      players: "2-4",
      duration: "25-30 min",
      image: "Assets/Images/Kingdomino Origin.jpg",
      description: "A prehistoric twist on the original Kingdomino with new scoring systems and bonuses.",
      tags: ["Tile Placement", "Set Collection", "Drafting"]
    },
    {
      name: "Cacao",
      category: "Strategy",
      players: "2-4",
      duration: "45 min",
      image: "Assets/Images/Cacao.jpg",
      description: "Grow and sell cacao in this tile-laying game of timing and resource management.",
      tags: ["Tile Placement", "Resource Management", "Economic"]
    },
    {
      name: "Exploding Kitten Blue Expansion",
      category: "Party",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/Exploding Kitten Blue Expansion.jpg",
      description: "An expansion to the hilarious Exploding Kittens game with new cards and chaos.",
      tags: ["Expansion", "Humor", "Push Your Luck"]
    },
    {
      name: "Game of Life",
      category: "Family",
      players: "2-6",
      duration: "60 min",
      image: "Assets/Images/Game of Life.jpg",
      description: "Travel through life making choices about career, family, and fortune in this classic game.",
      tags: ["Roll and Move", "Life Simulation", "Classic"]
    },
    {
      name: "Sherlock Holmes Detective",
      category: "Deduction",
      players: "1-8",
      duration: "60-120 min",
      image: "Assets/Images/Sherlock Holmes Detective.jpg",
      description: "Solve intricate cases by reading clues and piecing together the mystery.",
      tags: ["Storytelling", "Deduction", "Cooperative"]
    },
    {
      name: "Dream On",
      category: "Party",
      players: "2-8",
      duration: "20 min",
      image: "Assets/Images/Dream On.jpg",
      description: "Build a dream together, then try to recall it in the right order!",
      tags: ["Memory", "Storytelling", "Cooperative"]
    },
    {
      name: "Bang! The Dice Game",
      category: "Party",
      players: "3-8",
      duration: "15-20 min",
      image: "Assets/Images/Bang The Dice.jpg",
      description: "A faster version of Bang! with dice-rolling and hidden roles.",
      tags: ["Dice Rolling", "Hidden Roles", "Bluffing"]
    },
    {
      name: "Fun Fact",
      category: "Party",
      players: "4-8",
      duration: "20-30 min",
      image: "Assets/Images/Fun Fact.jpg",
      description: "Reveal hilarious and surprising facts about your friends in this light party game.",
      tags: ["Guessing", "Social", "Icebreaker"]
    },
    {
      name: "Concept",
      category: "Party",
      players: "4-12",
      duration: "40 min",
      image: "Assets/Images/Concept.jpg",
      description: "Use icons to get your teammates to guess words or phrases in this abstract communication game.",
      tags: ["Word Game", "Abstract", "Team-Based"]
    },
    {
      name: "Go Cuckoo",
      category: "Dexterity",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/Go Cuckoo.jpg",
      description: "Build a nest from sticks and carefully place eggs without making them fall.",
      tags: ["Dexterity", "Balancing", "Kids"]
    },
    {
      name: "Take 6",
      category: "Card Game",
      players: "2-10",
      duration: "30 min",
      image: "Assets/Images/Take 6.jpg",
      description: "Avoid collecting cards with bullheads in this fast-paced number game.",
      tags: ["Hand Management", "Number Game", "Set Collection"]
    },
    {
      name: "Spirits of the Forest",
      category: "Abstract",
      players: "1-4",
      duration: "20-30 min",
      image: "Assets/Images/Spirits of the Forest.jpg",
      description: "Collect sets of spirit tiles while managing resources and blocking opponents.",
      tags: ["Set Collection", "Abstract Strategy", "Tile Drafting"]
    },
    {
      name: "Skull",
      category: "Bluffing",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/Skull.jpg",
      description: "A bluffing game of risk and deception using coasters with flowers and skulls.",
      tags: ["Bluffing", "Risk Management", "Deduction"]
    },
    {
      name: "Room 25",
      category: "Thematic",
      players: "1-6",
      duration: "30-60 min",
      image: "Assets/Images/Room 25.jpg",
      description: "Escape a deadly maze filled with traps, suspicion, and betrayal.",
      tags: ["Hidden Traitor", "Modular Board", "Action Programming"]
    },
    {
      name: "Ramen Fury",
      category: "Card Game",
      players: "2-5",
      duration: "15-20 min",
      image: "Assets/Images/Ramen Fury.jpg",
      description: "Build the tastiest bowls of ramen by drafting ingredients and seasoning wisely.",
      tags: ["Drafting", "Set Collection", "Food Theme"]
    },
    {
      name: "Bag of Chips",
      category: "Party",
      players: "2-5",
      duration: "20 min",
      image: "Assets/Images/Bag of Chips.jpg",
      description: "Bet on outcomes and crunch your way to victory in this push-your-luck snack game.",
      tags: ["Betting", "Push Your Luck", "Drafting"]
    },
    {
      name: "Waroong Wars",
      category: "Family",
      players: "2-5",
      duration: "30-45 min",
      image: "Assets/Images/Waroong Wars.jpg",
      description: "Build your food stall empire and serve customers in this flavorful Indonesian-themed game.",
      tags: ["Resource Management", "Set Collection", "Local Theme"]
    },
    {
      name: "Cabo",
      category: "Card Game",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/Cabo.jpg",
      description: "A memory and deduction game where the goal is to have the lowest score by game end.",
      tags: ["Memory", "Deduction", "Card Game"]
    },
    {
      name: "Subastral",
      category: "Strategy",
      players: "2-5",
      duration: "30-45 min",
      image: "Assets/Images/Subastral.jpg",
      description: "Explore the biomes of Earth while drafting cards to complete your journal.",
      tags: ["Set Collection", "Drafting", "Nature Theme"]
    },
    {
      name: "Inside Job",
      category: "Bluffing",
      players: "3-5",
      duration: "20 min",
      image: "Assets/Images/Inside Job.jpg",
      description: "A hidden role game where an agent blends in with coworkers while sabotaging missions.",
      tags: ["Hidden Roles", "Deduction", "Cooperative"]
    },
    {
      name: "Boy Who Cried Wolf",
      category: "Party",
      players: "3-6",
      duration: "15-20 min",
      image: "Assets/Images/Boy Who Cried Wolf.jpg",
      description: "A storytelling and bluffing game based on the classic fable.",
      tags: ["Bluffing", "Storytelling", "Family"]
    },
    {
      name: "Dice Academy",
      category: "Party",
      players: "2-6",
      duration: "15 min",
      image: "Assets/Images/Dice Academy.jpg",
      description: "Match categories with letters as fast as you can using custom dice.",
      tags: ["Speed Game", "Dice Rolling", "Word Game"]
    },
    {
      name: "Dog Rush",
      category: "Dexterity",
      players: "2-6",
      duration: "10-15 min",
      image: "Assets/Images/Dog Rush.jpg",
      description: "Spot which dog is tangled up in leashes the fastest in this reflex-testing game.",
      tags: ["Observation", "Speed", "Pattern Recognition"]
    },
    {
      name: "Tacocat Goat Cheese Pizza",
      category: "Party",
      players: "3-8",
      duration: "10-15 min",
      image: "Assets/Images/Tacocat Goat Cheese Pizza.jpg",
      description: "Say words and slap cards fast—this chaotic game tests your reflexes and memory.",
      tags: ["Speed Game", "Party", "Reflex"]
    },
    {
      name: "We Will Rock You",
      category: "Party",
      players: "3-6",
      duration: "10-15 min",
      image: "Assets/Images/We Will Rock You.jpg",
      description: "A fast-paced rhythm and memory game based on iconic beats.",
      tags: ["Rhythm", "Memory", "Party"]
    },
    {
      name: "Mimiq",
      category: "Party",
      players: "2-6",
      duration: "10-15 min",
      image: "Assets/Images/Mimiq.jpg",
      description: "Collect matching sets by mimicking facial expressions and reading others.",
      tags: ["Memory", "Facial Expression", "Kids"]
    },
    {
      name: "Sekata",
      category: "Word Game",
      players: "2-6",
      duration: "20-30 min",
      image: "Assets/Images/Sekata.jpg",
      description: "Guess the same word as your teammate with only a single clue!",
      tags: ["Team-Based", "Word Guessing", "Communication"]
    },
    {
      name: "Who Did It",
      category: "Party",
      players: "3-6",
      duration: "15 min",
      image: "Assets/Images/Who Did It.jpg",
      description: "Accuse your friends’ pets of making a mess before they accuse yours!",
      tags: ["Bluffing", "Memory", "Reaction"]
    },
    {
      name: "Shadows Amsterdam",
      category: "Deduction",
      players: "2-8",
      duration: "20 min",
      image: "Assets/Images/Shadows Amsterdam.jpg",
      description: "Give clues using pictures in this fast-paced real-time deduction game.",
      tags: ["Deduction", "Real-Time", "Wordless Clues"]
    },
    {
      name: "Trial by Trolley",
      category: "Bluffing",
      players: "3-13",
      duration: "30 min",
      image: "Assets/Images/Trial by Trolley.jpg",
      description: "A darkly humorous game of moral dilemmas and choosing who lives or dies.",
      tags: ["Debate", "Bluffing", "Dark Humor"]
    },
    {
      name: "Dobble",
      category: "Party",
      players: "2-8",
      duration: "15 min",
      image: "Assets/Images/Dobble.jpg",
      description: "Find matching symbols faster than your opponents in this speedy observation game.",
      tags: ["Observation", "Speed", "Reflex"]
    },
    {
      name: "Yogi",
      category: "Party",
      players: "3-10",
      duration: "15-20 min",
      image: "Assets/Images/Yogi.jpg",
      description: "Twist, stretch, and hold awkward poses in this hilarious physical challenge game.",
      tags: ["Dexterity", "Physical", "Silly Fun"]
    },
    {
      name: "The Builders",
      category: "Strategy",
      players: "2-4",
      duration: "30 min",
      image: "Assets/Images/The Builders.jpg",
      description: "Hire workers and manage resources to complete historic buildings.",
      tags: ["Card Game", "Engine Building", "Resource Management"]
    },
    {
      name: "Mascarade",
      category: "Bluffing",
      players: "2-13",
      duration: "30 min",
      image: "Assets/Images/Mascarade.jpg",
      description: "A game of hidden roles, fast swaps, and clever bluffing at a grand masquerade ball.",
      tags: ["Hidden Roles", "Memory", "Bluffing"]
    },
    {
      name: "Scape Goat",
      category: "Bluffing",
      players: "3-6",
      duration: "20-30 min",
      image: "Assets/Images/Scape Goat.jpg",
      description: "One player is the scapegoat—can they figure it out before they’re thrown under the bus?",
      tags: ["Deduction", "Hidden Identity", "Bluffing"]
    },
    {
      name: "Avalon",
      category: "Bluffing",
      players: "5-10",
      duration: "30 min",
      image: "Assets/Images/Avalon.jpg",
      description: "A hidden role game of good vs evil set in Arthurian legend.",
      tags: ["Social Deduction", "Bluffing", "Team-Based"]
    },
    {
      name: "Two Rooms and a Boom",
      category: "Party",
      players: "6-30",
      duration: "15-20 min",
      image: "Assets/Images/Two Rooms and a Boom.jpg",
      description: "Split into two rooms and use hidden roles to protect or assassinate the president.",
      tags: ["Hidden Roles", "Social Deduction", "Party"]
    },
    {
      name: "Here to Slay",
      category: "Strategy",
      players: "2-6",
      duration: "30-60 min",
      image: "Assets/Images/Here to Slay.jpg",
      description: "Assemble a party of heroes and slay monsters or sabotage your rivals in this fantasy card game.",
      tags: ["Set Collection", "Card Game", "Take That"]
    },
    {
      name: "Werewolf Deluxe",
      category: "Party",
      players: "8-35",
      duration: "30-45 min",
      image: "Assets/Images/Werewolf Deluxe.jpg",
      description: "A social deduction classic where players must discover the werewolves hiding in the village.",
      tags: ["Social Deduction", "Hidden Roles", "Bluffing"]
    },
    {
      name: "Hamster Clan",
      category: "Family",
      players: "1-4",
      duration: "15-20 min",
      image: "Assets/Images/Hamster Clan.jpg",
      description: "Help the hamster family gather food for winter by moving through tunnels and collecting goods.",
      tags: ["Kids", "Movement", "Cooperative"]
    },
    {
      name: "Animal Upon Animal",
      category: "Dexterity",
      players: "2-4",
      duration: "15-20 min",
      image: "Assets/Images/Animal Upon Animal.jpg",
      description: "Stack wooden animals in this wobbly, fun dexterity game for all ages.",
      tags: ["Stacking", "Dexterity", "Kids"]
    },
    {
      name: "Texas Hold'em Set",
      category: "Card Game",
      players: "2-10",
      duration: "30-90 min",
      image: "Assets/Images/Texas Holdem.jpg",
      description: "Classic poker experience with bluffing, betting, and bold moves.",
      tags: ["Betting", "Bluffing", "Card Game"]
    },
    {
      name: "Bendomino",
      category: "Family",
      players: "2-4",
      duration: "20-30 min",
      image: "Assets/Images/Bendomino.jpg",
      description: "A curved twist on the classic domino game requiring smart placement and planning.",
      tags: ["Tile Placement", "Domino", "Abstract"]
    },
    {
      name: "One Key",
      category: "Cooperative",
      players: "2-6",
      duration: "20 min",
      image: "Assets/Images/One Key.jpg",
      description: "Find the key image through abstract clues before time runs out.",
      tags: ["Deduction", "Team-Based", "Clue Giving"]
    },
    {
      name: "Stella",
      category: "Party",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/Stella.jpg",
      description: "Connect images through associations in the Dixit universe.",
      tags: ["Word Association", "Creativity", "Deduction"]
    },
    {
      name: "Catch the Moon",
      category: "Dexterity",
      players: "2-6",
      duration: "20 min",
      image: "Assets/Images/Catch the Moon.jpg",
      description: "Climb to the moon by balancing ladders—don't let your dreams crash!",
      tags: ["Dexterity", "Balancing", "Tension"]
    },
    {
      name: "Canvas",
      category: "Strategy",
      players: "1-5",
      duration: "30 min",
      image: "Assets/Images/Canvas.jpg",
      description: "Create beautiful paintings by layering transparent cards for points and aesthetics.",
      tags: ["Set Collection", "Art", "Drafting"]
    },
    {
      name: "So Clover!",
      category: "Word Game",
      players: "3-6",
      duration: "30 min",
      image: "Assets/Images/So Clover.jpg",
      description: "Write clues that connect word pairs and work as a team to solve the clover puzzle.",
      tags: ["Cooperative", "Word Game", "Clue Giving"]
    },
    {
      name: "Slide Quest",
      category: "Dexterity",
      players: "1-4",
      duration: "20-30 min",
      image: "Assets/Images/Slide Quest.jpg",
      description: "Guide a knight through traps and puzzles by tilting the board together.",
      tags: ["Cooperative", "Dexterity", "Adventure"]
    },
    {
      name: "Goblet Gobblers",
      category: "Abstract",
      players: "2",
      duration: "5-10 min",
      image: "Assets/Images/Goblet Gobblers.jpg",
      description: "A fun twist on Tic Tac Toe where bigger pieces can gobble up smaller ones!",
      tags: ["Abstract Strategy", "Tic Tac Toe", "Blocking"]
    },
    {
      name: "Gummi Land",
      category: "Family",
      players: "2-4",
      duration: "15-30 min",
      image: "Assets/Images/Gummi Land.jpg",
      description: "Collect colorful gummies and complete orders in this sweet strategy game.",
      tags: ["Set Collection", "Kids", "Pattern Matching"]
    },
    {
      name: "Mr Wolf",
      category: "Cooperative",
      players: "1-4",
      duration: "15-20 min",
      image: "Assets/Images/Mr Wolf.jpg",
      description: "Work together to hide animals in their barns before the wolf arrives!",
      tags: ["Memory", "Cooperative", "Kids"]
    },
    {
      name: "Happy Bunny",
      category: "Cooperative",
      players: "1-4",
      duration: "15 min",
      image: "Assets/Images/Happy Bunny.jpg",
      description: "Help the bunny pick only ripe carrots for the farmer's basket.",
      tags: ["Memory", "Cooperative", "Kids"]
    },
    {
      name: "Harvest Dice",
      category: "Strategy",
      players: "2-4",
      duration: "20-30 min",
      image: "Assets/Images/Harvest Dice.jpg",
      description: "Draft dice to plant crops and feed your pig in this farm-themed roll and write.",
      tags: ["Dice Rolling", "Roll and Write", "Set Collection"]
    },
    {
      name: "No Thanks",
      category: "Card Game",
      players: "3-7",
      duration: "20 min",
      image: "Assets/Images/No Thanks.jpg",
      description: "A quick, clever game of risk-taking and card avoidance with simple rules and tough decisions.",
      tags: ["Push Your Luck", "Card Game", "Minimalist"]
    },
    {
      name: "Halli Galli",
      category: "Party",
      players: "2-6",
      duration: "15 min",
      image: "Assets/Images/Halli Galli.jpg",
      description: "A fast-reaction game where players race to ring the bell when fruit sets match!",
      tags: ["Reaction", "Speed", "Pattern Recognition"]
    },
    {
      name: "Geistes Blitz",
      category: "Party",
      players: "2-8",
      duration: "20 min",
      image: "Assets/Images/Geistes Blitz.jpg",
      description: "Grab the right object first using lightning-fast reflexes and visual logic.",
      tags: ["Speed Game", "Reflex", "Observation"]
    },
    {
      name: "Jungle Speed Safari",
      category: "Party",
      players: "2-6",
      duration: "15-20 min",
      image: "Assets/Images/Jungle Speed Safari.jpg",
      description: "A wilder version of Jungle Speed with animal noises and quick reflex challenges.",
      tags: ["Reflex", "Party", "Animal Theme"]
    },
    {
      name: "Cookie Box",
      category: "Dexterity",
      players: "2-4",
      duration: "15 min",
      image: "Assets/Images/Cookie Box.jpg",
      description: "Stack, balance, and race to arrange cookies and boxes faster than your friends.",
      tags: ["Stacking", "Speed", "Kids"]
    },
    {
      name: "Bears in Barrels",
      category: "Party",
      players: "2-4",
      duration: "10-15 min",
      image: "Assets/Images/Bears in Barrels.jpg",
      description: "Wind up the bears and race them across the table in this silly action game.",
      tags: ["Dexterity", "Wind-Up Toys", "Racing"]
    },
    {
      name: "Sheep N Sheep",
      category: "Family",
      players: "2-4",
      duration: "20 min",
      image: "Assets/Images/Sheep N Sheep.jpg",
      description: "Collect adorable sheep cards and complete objectives while watching out for sneaky tricks.",
      tags: ["Set Collection", "Card Game", "Kids"]
    },
    {
      name: "Felicity: The Cat in the Sack",
      category: "Bluffing",
      players: "3-5",
      duration: "20-30 min",
      image: "Assets/Images/Felicity.jpg",
      description: "Bid blindly for mystery cats—and avoid dogs—in this quirky auction game.",
      tags: ["Auction", "Bluffing", "Set Collection"]
    },
    {
      name: "Bam Bam Race",
      category: "Dexterity",
      players: "2-4",
      duration: "10-15 min",
      image: "Assets/Images/Bam Bam Race.jpg",
      description: "Race your car across the floor in this slam-the-pawn action game!",
      tags: ["Dexterity", "Racing", "Kids"]
    },
    {
      name: "Cat Lady",
      category: "Card Game",
      players: "2-4",
      duration: "20-30 min",
      image: "Assets/Images/Cat Lady.jpg",
      description: "Collect cats, food, toys, and costumes to become the ultimate cat lover.",
      tags: ["Set Collection", "Drafting", "Cute Theme"]
    },
    {
      name: "Mantis",
      category: "Card Game",
      players: "2-6",
      duration: "15 min",
      image: "Assets/Images/Mantis.jpg",
      description: "A fast, colorful card-stealing game from the makers of Exploding Kittens.",
      tags: ["Stealing", "Set Collection", "Color Matching"]
    },
    {
      name: "Crash Octopus",
      category: "Dexterity",
      players: "2-5",
      duration: "30 min",
      image: "Assets/Images/Crash Octopus.jpg",
      description: "Flick and collect treasures while dodging the chaotic movements of a giant octopus!",
      tags: ["Flicking", "Dexterity", "Modular Board"]
    },
    {
      name: "Smile",
      category: "Card Game",
      players: "3-5",
      duration: "30 min",
      image: "Assets/Images/Smile.jpg",
      description: "Capture cute creatures with glowworms—but be careful, some aren’t so friendly.",
      tags: ["Auction", "Set Collection", "Bluffing"]
    },
    {
      name: "Who Is It?",
      category: "Deduction",
      players: "2",
      duration: "15-20 min",
      image: "Assets/Images/Who Is It.jpg",
      description: "A kid-friendly guessing game where players try to find the mystery character.",
      tags: ["Guessing", "Deduction", "Kids"]
    },
    {
      name: "Sheriff of Nottingham 1st Edition",
      category: "Bluffing",
      players: "3-5",
      duration: "45 min",
      image: "Assets/Images/Sheriff of Nottingham.jpg",
      description: "Smuggle goods past the Sheriff or inspect players for contraband in this classic bluffing game.",
      tags: ["Bluffing", "Negotiation", "Bribery"]
    },
    {
      name: "Dr. Beaker",
      category: "Family",
      players: "2-4",
      duration: "15-20 min",
      image: "Assets/Images/Dr Beaker.jpg",
      description: "Race to mix chemicals in your beaker by rotating molecules into place.",
      tags: ["Dexterity", "Pattern Matching", "Puzzle"]
    },
    {
      name: "Pengoloo",
      category: "Kids",
      players: "2-4",
      duration: "15-20 min",
      image: "Assets/Images/Pengoloo.jpg",
      description: "Roll dice, remember colors, and collect eggs in this adorable memory game.",
      tags: ["Memory", "Dice Rolling", "Animal Theme"]
    },
    {
      name: "Get Packing",
      category: "Puzzle",
      players: "1-4",
      duration: "15-30 min",
      image: "Assets/Images/Get Packing.jpg",
      description: "Fit all the vacation items into your suitcase before your opponents.",
      tags: ["Spatial Reasoning", "Puzzle", "Race"]
    },
    {
      name: "Meeple Circus",
      category: "Dexterity",
      players: "2-5",
      duration: "45 min",
      image: "Assets/Images/Meeple Circus.jpg",
      description: "Stack and balance meeples to create daring circus performances.",
      tags: ["Stacking", "Dexterity", "Timed"]
    },
    {
      name: "Panic Mansion",
      category: "Dexterity",
      players: "2-4",
      duration: "20 min",
      image: "Assets/Images/Panic Mansion.jpg",
      description: "Shake your box to move the right objects into the right rooms the fastest.",
      tags: ["Real-Time", "Dexterity", "Speed"]
    },
    {
      name: "Peek-A-Mouse",
      category: "Kids",
      players: "2-6",
      duration: "15 min",
      image: "Assets/Images/Peek A Mouse.jpg",
      description: "Spot the objects the mice borrowed while they’re still lit up!",
      tags: ["Memory", "Observation", "Flashlight"]
    },
    {
      name: "Tock Tock Woodman",
      category: "Dexterity",
      players: "2-7",
      duration: "10-15 min",
      image: "Assets/Images/Tock Tock Woodman.jpg",
      description: "Chop the tree carefully without knocking it all down in this light-hearted game.",
      tags: ["Dexterity", "Stacking", "Tension"]
    },
    {
      name: "Rhino Hero",
      category: "Family",
      players: "2-5",
      duration: "15 min",
      image: "Assets/Images/Rhino Hero.jpg",
      description: "Stack walls and roofs while helping Rhino Hero climb up the building.",
      tags: ["Stacking", "Dexterity", "Kids"]
    },
    {
      name: "Nyctophobia",
      category: "Horror",
      players: "3-5",
      duration: "30-45 min",
      image: "Assets/Images/Nyctophobia.jpg",
      description: "Play in near-darkness and try to survive a stalker you can’t see.",
      tags: ["Unique Mechanic", "Survival", "Cooperative"]
    },
    {
      name: "Chronicles of Crime",
      category: "Deduction",
      players: "1-4",
      duration: "60-90 min",
      image: "Assets/Images/Chronicles of Crime.jpg",
      description: "Use VR and QR codes to investigate murder cases and solve mysteries.",
      tags: ["Crime Solving", "Technology", "Story Driven"]
    },
    {
      name: "Unlock: Escape Adventures",
      category: "Puzzle",
      players: "1-6",
      duration: "60 min",
      image: "Assets/Images/Unlock Escape Adventures.jpg",
      description: "Escape room in a box! Solve puzzles cooperatively using cards and a free app.",
      tags: ["Escape Room", "Puzzle", "Cooperative"]
    },
    {
      name: "Unlock: Timeless Adventures",
      category: "Puzzle",
      players: "1-6",
      duration: "60 min",
      image: "Assets/Images/Unlock Timeless Adventures.jpg",
      description: "Solve new escape scenarios spanning past, present, and future.",
      tags: ["Escape Room", "Time Travel", "Puzzle"]
    },
    {
      name: "Unlock: Heroic Adventures",
      category: "Puzzle",
      players: "1-6",
      duration: "60 min",
      image: "Assets/Images/Unlock Heroic Adventures.jpg",
      description: "Face off against heroic challenges in this narrative escape game pack.",
      tags: ["Puzzle", "Storytelling", "Adventure"]
    },
    {
      name: "Unlock: Exotic Adventures",
      category: "Puzzle",
      players: "1-6",
      duration: "60 min",
      image: "Assets/Images/Unlock Exotic Adventures.jpg",
      description: "Embark on three exotic themed escape room adventures using clever logic and teamwork.",
      tags: ["Escape Room", "Exploration", "Puzzle"]
    },
    {
      name: "Unlock: Mystery Adventures",
      category: "Puzzle",
      players: "1-6",
      duration: "60 min",
      image: "Assets/Images/Unlock Mystery Adventures.jpg",
      description: "Delve into mysteries and unravel complex scenarios with creative thinking.",
      tags: ["Puzzle", "Mystery", "Narrative"]
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