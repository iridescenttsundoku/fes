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

// function toggleSearch() { const searchBar = document.querySelector(".search__bar"); searchBar.classList.toggle("open"); }

// function toggleFilter() { const filterDropdown = document.querySelector(".filter__dropdown"); const filterFilter = document.querySelector(".filter__filter"); filterDropdown.classList.toggle("open"); filterFilter.classList.toggle("open");}


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".matrix-text");

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchPokeAPI(e.target.value);
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
