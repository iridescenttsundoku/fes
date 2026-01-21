function toggleSearch() {
  const searchBar = document.querySelector(".search__bar");

  searchBar.classList.toggle("open");
}

async function searchDotaAPI(query) {
  try {
    const response = await fetch(`https://api.opendota.com/api/heroStats`);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

searchDotaAPI();
