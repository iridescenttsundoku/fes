let contrastToggle = false;
let slideIndex = 1;

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

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

showSlides(slideIndex);function plusSlide(n) {
  showSlides(slideIndex += n);
}function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("media__slide");
  const shows = document.getElementsByClassName("media__show");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    shows[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  shows[slideIndex-1].style.display = "block";
}function prevSlide() {
  plusSlide(-1);
}function nextSlide() {
  plusSlide(1);
}
