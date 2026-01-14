function  openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

function toggleSearch() {
  const searchBar = document.querySelector(".search__bar");

  searchBar.classList.toggle("open");
}