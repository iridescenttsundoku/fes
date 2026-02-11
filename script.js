function toggleSearch() {
  const searchBar = document.querySelector(".search__bar");
  searchBar.classList.toggle("open");
}

function toggleFilter() {
  const filterDropdown = document.querySelector(".filter__dropdown");
  const filterFilter = document.querySelector(".filter__filter");
  filterDropdown.classList.toggle("open");
  filterFilter.classList.toggle("open");
}

function handleChange() {
  const filterDropdown = document.querySelector("select");
  const value = filterDropdown.value;
  filterDotaAPI(value);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search__bar--input");

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchDotaAPI(e.target.value);
    }
  });
});

async function searchDotaAPI(query) {
  if (!query) return;

  try {
    const response = await fetch(`https://api.opendota.com/api/heroStats`);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const data = await response.json();
    const hero = data.find(h => h.localized_name.toLowerCase() === query.toLowerCase());
    
    if (hero) {
      updateUI([hero]);
    } else {
      console.log("Hero not found.");
      alert("Hero not found.");
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function updateUI(heroes) {
  const attrImgs = {
    "agi": "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Agility_attribute_symbol.png",
    "str": "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Strength_attribute_symbol.png",
    "int": "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5e/Intelligence_attribute_symbol.png",
    "all": "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Universal_attribute_symbol.png/"
  };

  const attImgs = {
    "Melee": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/melee.svg",
    "Ranged": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/ranged.svg"
  };

  const perspectiveFlex = document.querySelector(".perspective__flex");
  perspectiveFlex.innerHTML = ""; // Clear existing cards

  heroes.forEach(hero => {
    // Determine images
    const primaryAttrImg = attrImgs[hero.primary_attr] || attrImgs['agi'];
    const attackTypeImg = attImgs[hero.attack_type] || attImgs['Melee'];
    const heroImageSrc = `https://api.opendota.com${hero.img}`;
    const rolesHtml = hero.roles.map(role => `<p>${role}.</p><br>`).join("");

    const heroCardsHtml = `
      <div class="perspective__col">
          <div class="perspective-item perspective-item__left">
              <div class="perspective-item__info perspective-item__infoUI">
                  <div class="info-imgs">
                      <img class="basic-img" src="${primaryAttrImg}" alt="${hero.primary_attr}"> 
                      <img class="basic-img" src="${attackTypeImg}" alt="${hero.attack_type}">
                  </div>
                  <div class="info-basic">
                      ${rolesHtml}
                  </div>
              </div>
              <div class="perspective-item__icon"><img src="${heroImageSrc}" alt="${hero.localized_name}"/></div>
          </div>
      </div>
      <div class="perspective__col">
          <div class="perspective-item perspective-item__right">
              <div class="perspective-item__title">${hero.localized_name}</div>
              <div class="perspective-item__subtitle">base stats</div>
              <div class="base-stats">
                  <ul class="stats">
                    <li class="stat">health / regen: ${hero.base_health} / ${hero.base_health_regen}</li>
                    <li class="stat">mana / regen: ${hero.base_mana} / ${hero.base_mana_regen}</li>
                    <li class="stat">armor: ${hero.base_armor}</li>
                    <li class="stat">magic resistance: ${hero.base_mr}%</li>
                    <li class="stat">attack min/max: ${hero.base_attack_min}/${hero.base_attack_max}</li>
                    <li class="stat">strength + gain: ${hero.base_str} + ${hero.str_gain}</li>
                    <li class="stat">agility + gain: ${hero.base_agi} + ${hero.agi_gain}</li>
                    <li class="stat">intelligence + gain: ${hero.base_int} + ${hero.int_gain}</li>
                  </ul>
              </div>
          </div>
      </div>
    `;

    perspectiveFlex.innerHTML += heroCardsHtml;
  });
}

function updateFUI(heroes) {
  const attrImgs = {
    "agi": "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2d/Agility_attribute_symbol.png",
    "str": "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Strength_attribute_symbol.png",
    "int": "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5e/Intelligence_attribute_symbol.png",
    "all": "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/Universal_attribute_symbol.png/"
  };

  const attImgs = {
    "Melee": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/melee.svg",
    "Ranged": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/ranged.svg"
  };

  const perspectiveFlex = document.querySelector(".perspective__flex");
  perspectiveFlex.innerHTML = ""; // Clear existing cards

  heroes.forEach(hero => {
    // Determine images
    const primaryAttrImg = attrImgs[hero.primary_attr] || attrImgs['agi'];
    const attackTypeImg = attImgs[hero.attack_type] || attImgs['Melee'];
    const heroImageSrc = `https://api.opendota.com${hero.img}`;
    const rolesHtml = hero.roles.map(role => `<p>${role}.</p><br>`).join("");

    const heroCardHtml = `
      <div class="perspective__col">
          <div class="perspective-item perspective-item__left">
              <div class="perspective-item__info perspective-item__infoFUI">
                  <div class="info-imgs">
                      <img class="basic-img" src="${primaryAttrImg}" alt="${hero.primary_attr}"> 
                      <img class="basic-img" src="${attackTypeImg}" alt="${hero.attack_type}">
                  </div>
                  <div class="info-basic">
                      ${rolesHtml}
                  </div>
              </div>
              <div class="perspective-item__title">${hero.localized_name}</div>
          </div>
      </div>
    `;

    perspectiveFlex.innerHTML += heroCardHtml;
  });
}

async function filterDotaAPI(filter) {
  try {
    const response = await fetch(`https://api.opendota.com/api/heroStats`);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const data = await response.json();
    let filteredHeroes;

    // Mapping full words to API short codes if needed, or checking both
    const attrMap = {
      "agility": "agi",
      "strength": "str",
      "intelligence": "int",
      "all": "all"
    };

    const mappedFilter = attrMap[filter.toLowerCase()] || filter;

    if (mappedFilter === "all") {
      filteredHeroes = data;
    } else if (["agi", "str", "int"].includes(mappedFilter)) {
      // Filter by Primary Attribute
      filteredHeroes = data.filter(h => h.primary_attr === mappedFilter);
    } else {
      // Filter by Attack Type (Melee / Ranged) - API matches exact string usually
      filteredHeroes = data.filter(h => h.attack_type.toLowerCase() === filter.toLowerCase());
    }

    if (filteredHeroes.length > 0) {
      updateFUI(filteredHeroes);
    } else {
      alert("No heroes found for this filter.");
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// search filter
//A-Z
//Z-A
//HtL agi
//HtL str
//HtL int
function sortHighToLow(array) {
  return array.sort((a, b) => b.base_str - a.base_str)
}
