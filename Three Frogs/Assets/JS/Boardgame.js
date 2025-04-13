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