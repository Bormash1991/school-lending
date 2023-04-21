import { CardTypeForCustomerPaginator } from "./models/types.model";
let dotsWrapper: HTMLDivElement = document.querySelector(".customer__dots");
let active: string = "customer__dot_active";
let img: HTMLImageElement = document.querySelector(".customer__img");
let square: HTMLImageElement = document.querySelector(".customer__square");
let icon: HTMLElement = document.querySelector(".customer__icon_elem");

function setActiveClass(dot: HTMLDivElement): void {
  dot.classList.add(active);
}

function setData(data: [], number: number): void {
  let textField = document.querySelector(".customer__text"),
    nameField = document.querySelector(".customer__name");
  let { imgUrl, color, text, author }: CardTypeForCustomerPaginator =
    data[number];
  textField.innerHTML = text;
  nameField.innerHTML = author;
  img.style.cssText = `
  background: url("${imgUrl}") center center/ cover no-repeat;
  `;
  square.style.cssText = `
  background-color:${color};
  `;
  icon.style.cssText = `
      fill: ${color};
      stroke: ${color};
  `;
}

function clickHandler(data: []): void {
  let dots = document.querySelectorAll(
    ".customer__dot"
  ) as unknown as HTMLDivElement[];
  dotsWrapper.addEventListener("click", (e: Event) => {
    let target = e.target as HTMLDivElement;
    if (target.classList.contains("customer__dot")) {
      dots.forEach((elem, i) => {
        if (elem == target) {
          clearActiveClass(dots);
          setActiveClass(target);
          setData(data, i);
        }
      });
    }
  });
}
function clearActiveClass(dots: HTMLDivElement[]): void {
  dots.forEach((d) => {
    d.classList.remove(active);
  });
}

function createDot(data: []): void {
  for (let i = 0; i < data.length; i++) {
    let dot: HTMLDivElement = document.createElement("div");
    dot.classList.add("customer__dot");
    dotsWrapper.appendChild(dot);
    if (i == 0) {
      dot.classList.add(active);
      setData(data, 0);
    }
  }
}
export function customersPaginator(data: []): void {
  createDot(data);
  clickHandler(data);
}
