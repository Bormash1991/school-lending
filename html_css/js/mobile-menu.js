window.addEventListener("DOMContentLoaded", () => {
  let humburger = document.querySelector(".header__humburger"),
    nav = document.querySelector(".header__nav"),
    cross = document.querySelector(".header__cross"),
    link = document.querySelector(".header__list");

  humburger.addEventListener("click", () => {
    // document.body.style.overflow = "hidden";
    nav.classList.add("header__nav_active");
  });
  cross.addEventListener("click", () => {
    // document.body.style.overflow = "unset";
    nav.classList.remove("header__nav_active");
  });
  link.addEventListener("click", (e) => {
    let target = e.target;

    if (e.target.className == "header__link") {
      // document.body.style.overflow = "unset";
      nav.classList.remove("header__nav_active");
    }
  });
});
