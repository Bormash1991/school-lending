export function smoothScroll(): void {
  document.querySelectorAll('a[href^="#"').forEach((link) => {
    link.addEventListener("click", function (e: Event) {
      e.preventDefault();
      let href: string = this.getAttribute("href").substring(1);
      const scrollTarget = document.getElementById(href) as HTMLLinkElement;
      const topOffset =
        (document.querySelector(".header") as HTMLDivElement).offsetHeight / 2;
      const elementPosition: number = scrollTarget.getBoundingClientRect().top;
      const offsetPosition: number = elementPosition - topOffset;
      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}
