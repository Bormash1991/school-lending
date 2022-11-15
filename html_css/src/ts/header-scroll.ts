let header: HTMLDivElement = document.querySelector(".header"),
  headerBack: HTMLDivElement = document.querySelector(".header__back"),
  inform: HTMLElement = document.querySelector(".inform");

export function headerAppearsWithScroll(): void {
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
}
