window.addEventListener("DOMContentLoaded", () => {
  let humburger = document.querySelector(".header__humburger"),
    nav = document.querySelector(".header__nav"),
    cross = document.querySelector(".header__cross");

  humburger.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    nav.classList.add("header__nav_active");
  });
  cross.addEventListener("click", () => {
    document.body.style.overflow = "unset";
    nav.classList.remove("header__nav_active");
  });
});
