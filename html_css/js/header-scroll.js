window.addEventListener("DOMContentLoaded", () => {
  let header = document.querySelector(".header"),
    headerBack = document.querySelector(".header__back");
  let inform = document.querySelector(".inform");
  window.addEventListener("scroll", () => {
    if (window.scrollY >= inform.clientHeight) {
      header.style.position = "sticky";
      headerBack.style.display = "none";
      header.classList.add("header__fix");
    } else {
      header.style.position = "unset";
      headerBack.style.display = "block";
      header.classList.remove("header__fix");
    }
  });
});
