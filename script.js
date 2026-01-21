function toggleSearch() {
  const searchBar = document.querySelector(".search__bar");
  searchBar.classList.toggle("open");
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
      updateUI(hero);
    } else {
      console.log("Hero not found.");
      alert("Hero not found.");
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// function updateUI(hero) {
  //update name
 // document.querySelector(".perspective-item__title")
  //update image
  //update roles
  //update attributes/attack

  //update stats}


function updateUI(hero) {
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

  // Update Image (OpenDota provides relative paths)
  const heroImg = document.querySelector(".perspective-item__icon");
  heroImg.innerHTML = `<img src="https://api.opendota.com${hero.img}" alt="${hero.name}"/>`

  // Update Roles
  const rolesContainer = document.querySelector(".info-basic");
  rolesContainer.innerHTML = hero.roles.map(role => `<p>${role}.</p><br>`).join("");
  
  // Update Attributes/Attack Type Icons
  const infoImgs = document.querySelector(".info-imgs");
  infoImgs.innerHTML = `
    <img class="basic-img" src="${attrImgs[hero.primary_attr] || attrImgs['agi']}" alt="${hero.primary_attr}">
    <img class="basic-img" src="${attImgs[hero.attack_type] || attImgs['Melee']}" alt="${hero.attack_type}">
  `;
  const rightContainer = document.querySelector(".perspective-item__right");
  rightContainer.innerHTML = `
    <div class="perspective-item__title">${hero.localized_name}</div>
      <div class = "perspective-item__subtitle">base stats</div>
          <div class = "base-stats">
              <ul class = "stats">
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
  ` 
}
