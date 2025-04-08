document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded");

    const gamesData = {
        mobile: [
            // Casual
            { name: "Temple Run", id: "temple", image: "Mobile_Pictures/Temple Run.avif", description: "A fast-paced endless running game in an ancient temple.", link: "https://play.google.com/store/apps/details?id=com.imangi.templerun&hl=id&pli=1" },
            { name: "Clash Royale", id: "cr", image: "Mobile_Pictures/Clash Royale.jpg", description: "A real-time strategy game with collectible card elements.", link: "https://play.google.com/store/apps/details?id=com.supercell.clashroyale" },
            { name: "Angry Birds 2", id: "angry", image: "Mobile_Pictures/Angry Birds 2.webp", description: "A slingshot physics game featuring birds vs. pigs.", link: "https://play.google.com/store/apps/details?id=com.rovio.baba" },
            { name: "Subway Surfers", id: "subway", image: "Mobile_Pictures/Subway Surfers.png", description: "An endless runner where you dodge trains and obstacles.", link: "https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf" },
            { name: "Candy Crush Saga", id: "candy", image: "Mobile_Pictures/Candy Crush Saga.png", description: "A match-three puzzle game with thousands of levels.", link: "https://play.google.com/store/apps/details?id=com.king.candycrushsaga" },
            
            // Multiplayer
            { name: "Brawl Stars", id: "brawl", image: "Mobile_Pictures/Brawl Stars.png", description: "A fast-paced 3v3 and battle royale action game.", link: "https://play.google.com/store/apps/details?id=com.supercell.brawlstars&hl=id&pli=1" },
            { name: "Clash of Clans", id: "coc", image: "Mobile_Pictures/Clash of Clans.jpg", description: "A strategy game where you build a village and attack others.", link: "https://play.google.com/pc-store/games/details?id=com.supercell.clashofclans&hl=id" },
            { name: "Call of Duty Mobile", id: "codm", image: "Mobile_Pictures/Call of Duty.jpg", description: "A first-person shooter with battle royale and multiplayer.", link: "https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter" },
            { name: "Mobile Legends: Bang Bang", id: "mlbb", image: "Mobile_Pictures/Mobile Legends.jpg", description: "A 5v5 MOBA similar to League of Legends.", link: "https://play.google.com/store/apps/details?id=com.mobile.legends&hl=id&pli=1" },
            
            // RPG & Adventure
            { name: "AFK Arena", id: "afk", image: "Mobile_Pictures/AFK Arena.webp", description: "An idle RPG where heroes fight even when you're offline.", link: "https://play.google.com/store/apps/details?id=com.lilithgame.hgame.gp" },
            { name: "Epic Seven", id: "epic", image: "Mobile_Pictures/Epic Seven.jpg", description: "An anime-style gacha RPG with an engaging storyline.", link: "https://play.google.com/store/apps/details?id=com.stove.epic7.google&hl=id" },
            { name: "SINoALICE", id: "sin", image: "Mobile_Pictures/SINoALICE.webp", description: "A dark fantasy RPG by the creator of Nier.", link: "https://play.google.com/store/apps/details?id=jp.co.pokelabo.sinoalice&hl=id" },
            { name: "Dragon Raja", id: "dragon", image: "Mobile_Pictures/Dragon Raja.jpg", description: "An open-world MMORPG with stunning visuals and deep customization.", link: "https://play.google.com/store/apps/details?id=com.zloong.eu.dr.gp&hl=id" },
            { name: "Another Eden", id: "another", image: "Mobile_Pictures/Another Eden.jpg", description: "A single-player JRPG with no energy limits.", link: "https://play.google.com/store/apps/details?id=games.wfs.anothereden&hl=id" },
            { name: "Guardian Tales", id: "guardian", image: "Mobile_Pictures/Guardian Tales.jpg", description: "A pixel-art adventure RPG with puzzles and action combat.", link: "https://play.google.com/store/apps/details?id=com.kakaogames.gdts" },
            { name: "Summoners War", id: "summoners", image: "Mobile_Pictures/Summoners War.jpg", description: "A turn-based RPG with monster collecting and battles.", link: "https://play.google.com/store/apps/details?id=com.com2us.smon.normal.freefull.google.kr.android.common" },
            { name: "Torchlight: Infinite", id: "torchlight", image: "Mobile_Pictures/Torchlight.jpg", description: "A mobile ARPG inspired by the classic Torchlight series.", link: "https://play.google.com/store/apps/details?id=com.xd.TLglobal&hl=id" },
            { name: "Nexomon: Extinction", id: "nexomon", image: "Mobile_Pictures/Nexomon.jpg", description: "A Pokémon-like monster-catching adventure game.", link: "https://play.google.com/store/apps/details?id=com.vewointeractive.nexomon.extinction" },
            { name: "Ragnarok M: Eternal Love", id: "ragnarok", image: "Mobile_Pictures/Ragnarok M.png", description: "A mobile MMORPG based on the classic Ragnarok Online.", link: "https://play.google.com/pc-store/games/details?id=com.gravity.romNAg&hl=id" },
            
            // Battle Royal
            { name: "Free Fire", id: "free", image: "Mobile_Pictures/Free Fire.webp", description: "A fast-paced, short-match battle royale.", link: "https://play.google.com/store/apps/details?id=com.dts.freefireth&hl=id" },
            { name: "PUBG Mobile", id: "pubg", image: "Mobile_Pictures/PUBG.jpg", description: "A battle royale game where players fight to be the last one standing.", link: "https://play.google.com/store/apps/details?id=com.tencent.ig" },
            { name: "Cyber Hunter", id: "cyber", image: "Mobile_Pictures/Cyber Hunter.png", description: "A futuristic battle royale with climbing and parkour.", link: "https://play.google.com/store/apps/details?id=com.cesengine.cyberhunter&hl=id" },
            
            // Strategy
            { name: "Boom Beach", id: "boom", image: "Mobile_Pictures/Boom Beach.jpg", description: "A tactical war game from the creators of Clash of Clans and Clash Royale.", link: "https://play.google.com/store/apps/details?id=com.supercell.boombeach&hl=id" },
            { name: "State of Survival", id: "sos", image: "Mobile_Pictures/State of Survival.png", description: "A zombie apocalypse survival strategy game.", link: "https://play.google.com/store/apps/details?id=com.kingsgroup.sos" },
            { name: "Rise of Kingdoms", id: "rok", image: "Mobile_Pictures/Rise of Kingdoms.jpeg", description: "A real-time strategy game with historical civilizations.", link: "https://play.google.com/store/apps/details?id=com.lilithgame.roc.gp" },
            { name: "Age of Empires Mobile", id: "agem", image: "Mobile_Pictures/Age of Empires Mobile.png", description: "A mobile adaptation of the classic RTS game.", link: "https://play.google.com/store/apps/details?id=com.proximabeta.aoemobile&hl=id" },
            
            // Racing
            { name: "Asphalt 9", id: "asphalt9", image: "Mobile_Pictures/Asphalt 9.webp", description: "An arcade racing game with stunning graphics.", link: "https://play.google.com/store/apps/details?id=com.gameloft.android.ANMP.GloftA9HM&listing=as9_porsche_911_csl_092023&hl=id" },
            { name: "CSR Racing 2", id: "csr2", image: "Mobile_Pictures/CSR Racing 2.png", description: "A drag racing game with realistic car models.", link: "https://play.google.com/store/apps/details?id=com.naturalmotion.customstreetracer2&hl=id" },
            { name: "Mario Kart Tour", id: "mario", image: "Mobile_Pictures/Mario Kart Tour.jpg", description: "A mobile version of the classic Mario Kart series.", link: "https://play.google.com/store/apps/details?id=com.nintendo.zaka" },
            { name: "Hill Climb Racing", id: "hill", image: "Mobile_Pictures/Hill Climb Racing.webp", description: "A physics-based driving game with fun challenges.", link: "https://play.google.com/store/apps/details?id=com.fingersoft.hillclimb&hl=id" },
            { name: "Need For Speed No Limits", id: "nfs", image: "Mobile_Pictures/Need For Speed No Limits.jpeg", description: "A mobile street racing game with customization.", link: "https://play.google.com/store/apps/details?id=com.ea.game.nfs14_row" },
            
            // Sports
            { name: "Golf Clash", id: "golf", image: "Mobile_Pictures/Golf Clash.jpg", description: "A real-time multiplayer golf game.", link: "https://play.google.com/store/apps/details?id=com.playdemic.golf.android&hl=id" },
            { name: "8 Ball Pool", id: "8ball", image: "Mobile_Pictures/8 Ball Pool.png", description: "A top-down billiards game with multiplayer support.", link: "https://play.google.com/store/apps/details?id=com.miniclip.eightballpool&hl=id" },
            { name: "FIFA Mobile", id: "fifam", image: "Mobile_Pictures/FIFA Mobile.png", description: "A soccer game featuring real players and teams.", link: "https://play.google.com/store/apps/details?id=com.ea.gp.fifamobile&hl=id" },
            { name: "eFootball 2024", id: "efootball", image: "Mobile_Pictures/eFootball 2024.avif", description: "A football (soccer) game competing with FIFA Mobile.", link: "https://play.google.com/store/apps/details?id=jp.konami.pesam&hl=id" },
            { name: "NBA Live Mobile", id: "nbam", image: "Mobile_Pictures/NBA Live Mobile.jpg", description: "A basketball simulation game with NBA stars.", link: "https://play.google.com/store/apps/details?id=com.ea.gp.nbamobile" },
            
            // Horror
            { name: "Granny", id: "granny", image: "Mobile_Pictures/Granny.jpg", description: "A stealth horror game where you escape a terrifying grandma.", link: "https://play.google.com/store/apps/details?id=com.dvloper.granny&hl=id" },
            { name: "Into the Dead 2", id: "itd2", image: "Mobile_Pictures/Into the Dead 2.jpg", description: "A zombie-runner game with an apocalyptic story.", link: "https://play.google.com/store/apps/details?id=com.pikpok.dr2.play&hl=id" },
            { name: "Eyes: Scary Thriller", id: "eyes", image: "Mobile_Pictures/Eyes.png", description: "A haunted house escape horror game.", link: "https://play.google.com/store/apps/details?id=com.eyesthegame.eyes&hl=en_IN" },
            { name: "Five Nights at Freddy's", id: "fnaf", image: "Mobile_Pictures/FNAF.png", description: "A survival horror game set in a creepy pizzeria.", link: "https://play.google.com/store/apps/details?id=com.scottgames.fivenightsatfreddys&hl=id" },
            
            // Puzzle & Brain Games
            { name: "2048", id: "2048", image: "Mobile_Pictures/2048.png", description: "A number puzzle game where you merge tiles to reach 2048.", link: "https://2048game.com/" },
            { name: "Brain Out", id: "brain", image: "Mobile_Pictures/Brain Out.jpg", description: "A tricky puzzle game that tests your thinking.", link: "https://play.google.com/store/apps/details?id=com.mind.quiz.brain.out&hl=id" },
            { name: "The Room", id: "theroom", image: "Mobile_Pictures/The Room.png", description: "A mysterious escape room puzzle game.", link: "https://play.google.com/store/apps/details?id=com.FireproofStudios.TheRoom4" },
            { name: "Sudoku.com", id: "sudoku", image: "Mobile_Pictures/Sudoku.webp", description: "A mobile version of the classic number puzzle.", link: "https://play.google.com/store/apps/details?id=com.supersimpleapps.sudoku&hl=en" },
            { name: "Monument Valley", id: "monument", image: "Mobile_Pictures/Monument Valley.jpg", description: "A beautiful puzzle game with optical illusions.", link: "https://play.google.com/store/apps/details?id=com.ustwo.monumentvalley&hl=id" },
            
            // Simulation
            { name: "BitLife", id: "bitlife", image: "Mobile_Pictures/BitLife.jpeg", description: "A text-based life simulation with endless choices.", link: "https://play.google.com/store/apps/details?id=com.candywriter.bitlife&hl=id" },
            { name: "Pocket City", id: "pocket", image: "Mobile_Pictures/Pocket City.png", description: "A city-building simulator like SimCity.", link: "https://play.google.com/store/apps/details?id=com.codebrewgames.pocketcitygame&hl=id" },
            { name: "Stardew Valley", id: "stardew", image: "Mobile_Pictures/Stardew Valley.jpeg", description: "A farming RPG with town interactions and exploration.", link: "https://play.google.com/store/apps/details?id=com.chucklefish.stardewvalley" },
            { name: "The Sims Mobile", id: "simsm", image: "Mobile_Pictures/The Sims Mobile.jpg", description: "A life simulation game where you create and control characters.", link: "https://play.google.com/store/apps/details?id=com.ea.gp.simsmobile" },
            { name: "RollerCoaster Tycoon", id: "rollercoaster", image: "Mobile_Pictures/RollerCoaster Tycoon.jpg", description: "A theme park management simulation game.", link: "https://play.google.com/store/apps/details?id=com.netflix.NGP.RollercoasterTycoonTouch" },

        ],
        pc: [
            // Solo
            { name: "Hades", id: "hades", image: "PC_Pictures/Hades.avif", description: "A roguelike dungeon crawler with Greek mythology.", link: "https://store.steampowered.com/app/1145360/Hades/" },
            { name: "Celeste", id: "celeste", image: "PC_Pictures/Celeste.png", description: "A pixel-art platformer with a heartfelt story and challenging gameplay.", link: "https://store.steampowered.com/app/504230/Celeste/" },
            { name: "Elden Ring", id: "elden", image: "PC_Pictures/Elden Ring.jpg", description: "An action RPG set in a vast open world created by FromSoftware.", link: "https://store.steampowered.com/app/1245620/ELDEN_RING/" },
            { name: "Hollow Knight", id: "hollow", image: "PC_Pictures/Hollow Knight.png", description: "An epic action adventure through a vast ruined kingdom of insects and heroes.", link: "https://store.steampowered.com/app/367520/Hollow_Knight/" },
            { name: "Sekiro: Shadows Die Twice", id: "sekiro", image: "PC_Pictures/Sekiro.jpg", description: "A fast-paced action game with sword combat.", link: "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/" },
            
            // Teamwork
            { name: "Fortnite", id: "fortnite", image: "PC_Pictures/Fortnite.jpeg", description: "A battle royale game with building mechanics and fast-paced combat.", link: "https://www.epicgames.com/fortnite/en-US/home" },
            { name: "Valorant", id: "valorant", image: "PC_Pictures/Valorant.jpg", description: "A tactical FPS with character-based abilities.", link: "https://store.epicgames.com/en-US/p/valorant" },
            { name: "Minecraft", id: "minecraft", image: "PC_Pictures/Minecraft.avif", description: "A sandbox game where players can build and explore infinite worlds.", link: "https://www.minecraft.net/en-us" },
            { name: "Overwatch 2", id: "overwatch2", image: "PC_Pictures/Overwatch 2.jpg", description: "A team-based hero shooter with unique abilities.", link: "https://store.steampowered.com/app/2357570/Overwatch_2/" },
            { name: "Counter-Strike 2", id: "cs2", image: "PC_Pictures/Counter-Strike 2.jpeg", description: "A competitive first-person shooter with tactical gameplay.", link: "https://store.steampowered.com/app/730/CounterStrike_2/" },
            
            // Story & Adventure
            { name: "God of War", id: "god", image: "PC_Pictures/God of War.jpg", description: "A cinematic action-adventure with Norse mythology.", link: "https://www.playstation.com/en-us/god-of-war/" },
            { name: "Genshin Impact", id: "genshin", image: "PC_Pictures/Genshin Impact.jpeg", description: "An open-world action RPG set in the world of Teyvat.", link: "https://genshin.hoyoverse.com/pc-launcher/#/" },
            { name: "The Witcher 3: Wild Hunt", id: "witcher3", image: "PC_Pictures/The Witcher 3.avif", description: "An action role-playing game with a third-person perspective.", link: "https://www.playstation.com/en-tw/games/the-witcher-3-wild-hunt/" },
            { name: "Red Dead Redemption 2", id: "rdd2", image: "PC_Pictures/Red Dead Redemption 2.avif", description: "An epic open world (action-adventure) game set in 1899 America.", link: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/" },

            // Open-World Exploration
            { name: "Starfield", id: "starfield", image: "PC_Pictures/Starfield.jpg", description: "A space-exploration RPG with deep roleplaying mechanics.", link: "https://store.steampowered.com/app/1716740/Starfield/" },
            { name: "No Man's Sky", id: "no", image: "PC_Pictures/No Man's Sky.jpg", description: "A space exploration game with endless procedural planets.", link: "https://store.steampowered.com/app/275850/No_Mans_Sky/" },
            { name: "Cyber Punk 2077", id: "cyberpunk", image: "PC_Pictures/Cyber Punk 2077.jpg", description: "A futuristic RPG set in a neon-lit cyberpunk city.", link: "https://store.steampowered.com/agecheck/app/1091500/" },
            
            // Horror & Survival
            { name: "The Forest", id: "theforest", image: "PC_Pictures/The Forest.avif", description: "A survival horror game with crafting and exploration.", link: "https://store.steampowered.com/app/242760/The_Forest/" },
            { name: "Phasmophobia", id: "phasmophobia", image: "PC_Pictures/Phasmophobia.jpg", description: "A co-op ghost-hunting game with VR support.", link: "https://store.steampowered.com/app/739630/Phasmophobia/" },
            { name: "Dead by Daylight", id: "dbd", image: "PC_Pictures/Dead by Daylight.jpg", description: "A 4v1 multiplayer horror game.", link: "https://store.steampowered.com/app/381210/Dead_by_Daylight/" },
            { name: "Resident Evil Village", id: "rev", image: "PC_Pictures/Resident Evil Village.png", description: "A survival horror game with action elements.", link: "https://store.steampowered.com/agecheck/app/1196590/" },
            { name: "Amnesia: The Dark Descent", id: "amnesia", image: "PC_Pictures/Amnesia.jpg", description: "A psychological horror classic.", link: "https://store.steampowered.com/app/57300/Amnesia_The_Dark_Descent/" },
            
            // Strategy & Tactics
            { name: "Stellaris", id: "stellaris", image: "PC_Pictures/Stellaris.png", description: "A space-based grand strategy game.", link: "https://store.steampowered.com/app/281990/Stellaris/" },
            { name: "XCOM 2", id: "xcom2", image: "PC_Pictures/XCOM 2.jpg", description: "A tactical squad-based strategy game with permadeath.", link: "https://store.steampowered.com/app/268500/XCOM_2/" },
            { name: "Civilization VI", id: "civil6", image: "PC_Pictures/Civilization VI.webp", description: "A turn-based strategy game where you build an empire.", link: "https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/" },
            { name: "Age of Empires IV", id: "aoe4", image: "PC_Pictures/Age of Empires IV.png", description: "A real-time strategy game about historical warfare.", link: "https://store.steampowered.com/app/1466860/Age_of_Empires_IV_Anniversary_Edition/" },
            { name: "Total War: Warhammer III", id: "tw3", image: "PC_Pictures/Total War 3.jpg", description: "A large-scale strategy game with epic battles.", link: "https://store.steampowered.com/app/1142710/Total_War_WARHAMMER_III/" },
            
            // Simulation & Management
            { name: "Factorio", id: "factorio", image: "PC_Pictures/Factorio.png", description: "A factory-building game focused on automation.", link: "https://store.steampowered.com/app/427520/Factorio/" },
            { name: "The Sims 4", id: "thesims4", image: "PC_Pictures/The Sims 4.jpg", description: "A life simulation game where you create and control lives.", link: "https://store.steampowered.com/app/1222670/The_Sims_4/" },
            { name: "Cities: Skylines", id: "cities", image: "PC_Pictures/Cities Skylines.jpg", description: "A deep city-building simulator.", link: "https://store.steampowered.com/app/255710/Cities_Skylines/" },
            { name: "RollerCoaster Tycoon 2", id: "rollercoaster2", image: "PC_Pictures/RollerCoaster Tycoon 2.jpg", description: "A classic theme park management game.", link: "https://store.steampowered.com/app/285330/RollerCoaster_Tycoon_2_Triple_Thrill_Pack/" },
            { name: "Microsoft Flight Simulator", id: "mfs", image: "PC_Pictures/Microsoft Flight Simulator 2024.png", description: "A highly realistic flying experience.", link: "https://store.steampowered.com/app/2537590/Microsoft_Flight_Simulator_2024/" },
            
            // Racing & Sports
            { name: "F1 2024", id: "f1", image: "PC_Pictures/F1 2024.avif", description: "A Formula 1 simulation game with realistic mechanics.", link: "https://store.steampowered.com/app/2488620/F1_24/" },
            { name: "MotoGP 24", id: "motogp", image: "PC_Pictures/MotoGP 24.avif", description: "A high-speed motorcycle racing simulation.", link: "https://store.steampowered.com/app/2581700/MotoGP24/" },
            { name: "Rocket League", id: "rocket", image: "PC_Pictures/Rocket League.png", description: "A unique mix of soccer and car-based gameplay.", link: "https://store.epicgames.com/en-US/p/rocket-league" },
            { name: "Forza Horizon 5", id: "fh5", image: "PC_Pictures/Forza Horizon 5.webp", description: "An open-world racing game with stunning visuals.", link: "https://store.steampowered.com/app/1551360/Forza_Horizon_5/" },
            { name: "EA Sports FC 24 (FIFA 24)", id: "easports", image: "PC_Pictures/EA Sports FC 24.webp", description: "A realistic football/soccer simulation.", link: "https://store.steampowered.com/app/2195250/EA_SPORTS_FC_24/" },
        ]
    };

    function populateGames(listId, category) {
        const listElement = document.getElementById(listId);
        if (!listElement) return;
    
        const categoryTitles = {
            // PC Categories
            solo: "🔥 Solo Adventures",
            teamwork: "🤝 Team-Based Games",
            story: "📖 Story & Adventure",
            openworld: "🌍 Open-World Exploration",
            horror: "👻 Horror & Survival",
            strategy: "🧠 Strategy & Tactics",
            simulation: "🏗️ Simulation & Management",
            racing: "🏎️ Racing & Sports",
    
            // Mobile Categories
            casual: "🎮 Casual Games",
            multiplayer: "🌐 Multiplayer Battles",
            rpg: "⚔️ RPG & Adventure",
            battle: "🔥 Battle Royale",
            strategy_m: "🧠 Strategy & Tactics",
            racing_m: "🏎️ Racing & Driving",
            sports: "⚽ Sports Games",
            horror_m: "👻 Horror & Thriller",
            puzzle: "🧩 Puzzle & Brain Games",
            simulation_m: "🏗️ Simulation & Life",
        };
    
        let currentCategory = "";
    
        gamesData[category].forEach((game) => {
            let gameCategory = getGameCategory(game.id, category);
    
            if (gameCategory !== currentCategory) {
                currentCategory = gameCategory;
                let separator = document.createElement("div");
                separator.classList.add("separator");
                separator.textContent = categoryTitles[gameCategory] || "Other Games";
                listElement.appendChild(separator);
            }
    
            let gameItem = document.createElement("div");
            gameItem.classList.add("game-item");
            gameItem.id = game.id;
    
            let img = document.createElement("img");
            img.src = game.image;
            img.alt = game.name;
    
            let info = document.createElement("div");
            info.classList.add("game-info");
            info.innerHTML = `<h2>${game.name}</h2><p>${game.description}</p>`;
    
            let link = document.createElement("a");
            link.href = game.link;
            link.classList.add("download-link");
            link.textContent = "Download";
            link.target = "_blank";
    
            gameItem.append(img, info, link);
            listElement.appendChild(gameItem);
        });
    }
    
    function getGameCategory(gameId, categoryType) {
        if (categoryType === "pc") {
            // PC Game Categories
            if (["hades", "celeste", "elden", "hollow", "sekiro"].includes(gameId)) return "solo";
            if (["fortnite", "valorant", "minecraft", "overwatch2", "cs2"].includes(gameId)) return "teamwork";
            if (["god", "genshin", "witcher3", "rdd2"].includes(gameId)) return "story";
            if (["starfield", "no", "cyberpunk"].includes(gameId)) return "openworld";
            if (["theforest", "phasmophobia", "dbd", "rev", "amnesia"].includes(gameId)) return "horror";
            if (["stellaris", "xcom2", "civil6", "aoe4", "tw3"].includes(gameId)) return "strategy";
            if (["factorio", "thesims4", "cities", "rollercoaster2", "mfs"].includes(gameId)) return "simulation";
            if (["f1", "motogp", "rocket", "fh5", "easports"].includes(gameId)) return "racing";

        } else if (categoryType === "mobile") {
            // Mobile Game Categories
            if (["temple", "cr", "angry", "subway", "candy"].includes(gameId)) return "casual";
            if (["brawl", "coc", "codm", "mlbb"].includes(gameId)) return "multiplayer";
            if (["afk", "epic", "sin", "dragon", "another", "guardian", "summoners", "torchlight", "nexomon", "ragnarok"].includes(gameId)) return "rpg";
            if (["free", "pubg", "cyber"].includes(gameId)) return "battle";
            if (["boom", "sos", "rok", "agem"].includes(gameId)) return "strategy_m";
            if (["asphalt9", "csr2", "mario", "hill", "nfs"].includes(gameId)) return "racing_m";
            if (["golf", "8ball", "fifam", "efootball", "nbam"].includes(gameId)) return "sports";
            if (["granny", "itd2", "eyes", "fnaf"].includes(gameId)) return "horror_m";
            if (["2048", "brain", "theroom", "sudoku", "monument"].includes(gameId)) return "puzzle";
            if (["bitlife", "pocket", "stardew", "simsm", "rollercoaster"].includes(gameId)) return "simulation_m";
        }
        return "other";
    }
    
    if (document.getElementById("pc-games-list")) {
        populateGames("pc-games-list", "pc");
    }
    
    if (document.getElementById("mobile-games-list")) {
        populateGames("mobile-games-list", "mobile");
    }    

    function selectGame(gameId) {
        let card = document.getElementById(gameId);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add("highlight");
            setTimeout(() => {
                card.classList.remove("highlight");
            }, 2000);
        }
    }    

    function scrollToGame(gameId) {
        let gameElement = document.getElementById(gameId);
        if (gameElement) {
            gameElement.scrollIntoView({ behavior: "smooth", block: "center" });
            
            gameElement.style.transition = "background-color 0.5s ease";
            gameElement.style.backgroundColor = "#FFD700";
            
            setTimeout(() => {
                gameElement.style.backgroundColor = "";
            }, 1000);
        }
    }

    document.querySelectorAll(".category-link").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            let targetId = this.getAttribute("data-target");
            scrollToGame(targetId);
            
        });
    });
});