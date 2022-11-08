let dotsWrapper = document.querySelector(".customer__dots");
let active = "customer__dot_active";
let img = document.querySelector(".customer__img");
let square = document.querySelector(".customer__square");
let icon = document.querySelector(".customer__icon_elem");
export function customersPaginator(data) {
  createDot(data);
  clickHandler(data);
}
function clickHandler(data) {
  let dots = document.querySelectorAll(".customer__dot");
  dotsWrapper.addEventListener("click", (e) => {
    let target = e.target;
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
function clearActiveClass(dots) {
  dots.forEach((d) => {
    d.classList.remove(active);
  });
}
function setActiveClass(dot) {
  dot.classList.add(active);
}
function createDot(data) {
  for (let i = 0; i < data.length; i++) {
    let dot = document.createElement("div");
    dot.classList.add("customer__dot");
    dotsWrapper.appendChild(dot);
    if (i == 0) {
      dot.classList.add(active);
      setData(data, 0);
    }
  }
}
function setData(data, number) {
  let textField = document.querySelector(".customer__text"),
    nameField = document.querySelector(".customer__name");
  let { imgUrl, color, text, author } = data[number];
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
