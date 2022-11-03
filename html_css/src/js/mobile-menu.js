let humburgerElem = document.querySelector(".header__humburger"),
  nav = document.querySelector(".header__nav"),
  cross = document.querySelector(".header__cross"),
  link = document.querySelector(".header__list"),
  activeClass = "header__nav_active";

export function hamburger() {
  clickHundlers();
}

function clickHundlers() {
  humburgerElem.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    nav.classList.add(activeClass);
  });
  cross.addEventListener("click", closeMenu);
  link.addEventListener("click", (e) => {
    let target = e.target;
    if (e.target.className == "header__link") {
      closeMenu();
    }
  });
}

function closeMenu() {
  document.body.style.overflow = "";
  nav.classList.remove(activeClass);
}
