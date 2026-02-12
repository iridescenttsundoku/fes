// https://pokeapi.co/api/v2/
const scaleFactor = 1/20;

function toggleHeading() {
  const headTop = document.querySelector(".heading");
  headTop.classList.toggle("open");
}

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolOdd = isOdd ? -1 : 1 ;
    shapes[i].style.transform = `translate(${x * boolOdd}px, ${y * boolOdd}px) rotate(${x * boolOdd * 10}deg)`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".matrix-container");

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchPokeAPI(e.target.value);
      searchInput.innerHTML = `
        <div class = "matrix__search">
          <input type="text" placeholder="«POKÉMON»" />
          <div class="rain"></div>
        </div>
      `;
    }
  });
});


async function searchPokeAPI(query) {
  try {
    // Try Pokémon first
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    
    if (response.ok) {
      const data = await response.json();
      updatePKMN([data]);
      return;
    }

    // If not found, try Type endpoint
    response = await fetch(`https://pokeapi.co/api/v2/type/${query.toLowerCase()}`);
    
    if (response.ok) {
      const typeData = await response.json();
      updateType(typeData.pokemon);
      return;
    }

    alert("Not found. Try again.");

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//make updatePKMN

function updatePKMN([data]) {
  const dexLeft = document.querySelector(".dex-left");
  dexLeft.innerHTML = ""; // Clear existing cards
  const iconsHTML = `<div class = "container">
                    <div class = "row">
                        <div class="perspective">
                            <div class="perspective__flex">
                                <div class="perspective__col">
                                    <div class="perspective__item">
                                        <div class="perspective__icon"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt=""/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

  dexLeft.innerHTML += iconsHTML;

  const dexRight = document.querySelector(".dex-right");
  dexRight.innerHTML = "";

  const typeIDArray = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "stellar"];
  const typeName = data.types[0].type.name;
  const typeID = typeIDArray.indexOf(typeName) + 1;

  const prevID = data.id - 1;
  const nextID = data.id + 1;

  const entryHTML = `
  <div class = "container">
    <div class = "row">
        <div class = "perspective">
            <div class = "perspective__flex">
                <div class = "perspective__col">
                    <div class = "perspective-item">
                        <div class = "perspective__top">
                            <div class = "perspective__stats">
                                <div class = "stats-header">
                                    <h2 class = "pkmn-species">${data.name}</h2>
                                </div>
                                <div class = "stats-id">
                                    <div class = "stats-num">
                                        <p>No. ${data.id}</p>
                                    </div>
                                    <div class = "stats-type">
                                        <figure class = "pkmn-type"><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/${typeID}.png"></figure>
                                    </div>
                                </div>
                            </div>
                            <div class = "perspective__order">
                                <div class = "arrows">
                                    <div class = "arrow-before" onclick = "prevPKMN()"><i class="fa-solid fa-arrow-left-long"></i></div>
                                    <div class = "arrow-after" onclick = "nextPKMN()"><i class="fa-solid fa-arrow-right-long"></i></div>
                                </div>
                                <div class = "names">
                                    <p>${prevID}</p>
                                    <p>${nextID}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  `;

  dexRight.innerHTML += entryHTML;
}

//make updateType

function updateType(typeData) {
  const resultsList = document.querySelector(".results");
  resultsList.innerHTML = "";

  const urlSplit = pokemon.url[1].split("/");
  const pkmnID = urlSplit[4];

  pokemon.forEach(pokemon => {
    resultHTML = `
      <div class = "result-sprite">
        <img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnID}.png" alt = "scorbunny sprite">
      </div>
      <div class = "result-info">
        <div class = "result-type">
          <figure class = "result-type__img"><img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/${id}.png"></figure>
        </div>
        <h2 class = "result-species">${pokemon.pokemon.name}</h2>
        <div class = "result-id">
          <p>No. ${pkmnID}</p>
        </div>
      </div>
      `;
      resultsList.innerHTML += resultHTML;
  }
  );
}

//make filter
