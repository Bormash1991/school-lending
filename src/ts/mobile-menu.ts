let humburgerElem: HTMLDivElement =
    document.querySelector(".header__humburger"),
  nav: HTMLElement = document.querySelector(".header__nav"),
  cross: HTMLDivElement = document.querySelector(".header__cross"),
  link: HTMLUListElement = document.querySelector(".header__list"),
  activeClass: string = "header__nav_active";

export function hamburger(): void {
  clickHundlers();
}

function clickHundlers(): void {
  humburgerElem.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    nav.classList.add(activeClass);
  });
  cross.addEventListener("click", closeMenu);
  link.addEventListener("click", (e: Event) => {
    let target = e.target as HTMLLinkElement;
    if (target.className == "header__link") {
      closeMenu();
    }
  });
}

function closeMenu(): void {
  document.body.style.overflow = "";
  nav.classList.remove(activeClass);
}
