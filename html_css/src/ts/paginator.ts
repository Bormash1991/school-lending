import { cardTypeForPaginator } from "./models/types.model";
import throttle from "lodash.throttle";
let buttonsParent: HTMLDivElement = document.querySelector(".blog__list"),
  elementsWrapper: HTMLDivElement = document.querySelector(
    ".blog__wrap-elements"
  ),
  slides: number = 2,
  activeClass: string = "blog__btn_active",
  horizontal: boolean = false;

export function paginator(data: cardTypeForPaginator[]): void {
  window.addEventListener(
    "resize",
    throttle(resizeCallback.bind(this, data), 700)
  );
  createButtons(data);
  clickHandler(data);
}

function templateBlogElements(
  id: cardTypeForPaginator["id"],
  title: cardTypeForPaginator["title"],
  url: cardTypeForPaginator["url"],
  userImage: cardTypeForPaginator["userImage"],
  redirectLink: cardTypeForPaginator["redirectLink"],
  category: cardTypeForPaginator["category"]
): string {
  return `
              <div id="${id}" class="blog__wrap-item flex_justify-c">
                <div class="blog__wrap-left">
                  <div class="blog__name">${category}</div>
                  <img
                    src="${userImage}"
                    alt="person"
                    class="blog__person-img"
                    width="48"
                  />
                </div>
                <div class="blog__wrap-right">
                  <img
                    src="${url}"
                    alt="laptops"
                    class="blog__img"
                    width="328"
                  />
                  <div class="blog__text">
                   ${title}
                  </div>
                  <a href="${redirectLink}" class="blog__more">Read Now</a>
                </div>
              </div>
        `;
}

function templateButtons(num: number): string {
  return `
      <li class="blog__elem ">
                <button class="blog__btn">${num}</button>
              </li>
    `;
}

function checkWindowWidth(): void {
  if (window.innerWidth < 1440) {
    slides = 1;
  }
  if (window.innerWidth >= 1440) {
    horizontal = false;
    slides = 2;
  }
  if (window.innerWidth < 768) {
    horizontal = true;
  }
}
function resizeCallback(data: cardTypeForPaginator[]) {
  checkWindowWidth();
  elementsWrapper.innerHTML = "";
  buttonsParent.innerHTML = "";
  buttonsParent.setAttribute("style", `transform:transform(0px,0px )`);
  createButtons(data);
  clickHandler(data);
}
checkWindowWidth();

function checkActiveButton(count: number, data: cardTypeForPaginator[]): void {
  let btns = document.querySelectorAll(
    ".blog__btn"
  ) as unknown as HTMLButtonElement[];
  if (count % 2 == 0 && btns.length < 5) {
    btns[0].classList.add(activeClass);
    createElements(data, 1, slides);
  } else if (count % 2 != 0 && btns.length <= 5) {
    let num = Math.trunc(count / 2);
    btns[num].classList.add(activeClass);
    createElements(data, num + 1, slides);
  } else {
    btns[2].classList.add(activeClass);
    createElements(data, 3, slides);
  }
  clickHandler(data);
}

function clickHandler(data: cardTypeForPaginator[]): void {
  let btns = document.querySelectorAll(
      ".blog__btn"
    ) as unknown as HTMLButtonElement[],
    arrs = [...btns];
  buttonsParent.addEventListener("click", (e: Event) => {
    let target = e.target as HTMLButtonElement;
    arrs.forEach((elem, i) => {
      if (target == elem && !target.classList.contains(activeClass)) {
        arrs.forEach((e, index) => {
          if (e.classList.contains(activeClass)) {
            e.classList.remove(activeClass);
          }
        });
        elem.classList.add(activeClass);
        elementsWrapper.innerHTML = "";
        createElements(data, i + 1, slides);
        if (btns.length > 5) {
          autoScrollListOfButtons(i, btns);
        }
      }
    });
  });
}

function setTransformValue(trigger: boolean): {
  value: string;
  number: number;
} {
  if (trigger) {
    return {
      value: "translateX",
      number: 62,
    };
  } else {
    return {
      value: "translateY",
      number: 58,
    };
  }
}

function autoScrollListOfButtons(
  index: number,
  btns: HTMLButtonElement[]
): void {
  let { value, number } = setTransformValue(horizontal);

  if (index <= 3) {
    buttonsParent.setAttribute("style", `transform: ${value}(-0px)`);
  }

  if (index > 3 && index < btns.length - 1) {
    buttonsParent.setAttribute(
      "style",
      `transform: ${value}(-${number * (index - 3)}px)`
    );
  }
}

function createElements(
  data: cardTypeForPaginator[],
  numberOfBtn: number,
  coutOfSlides: number
): void {
  let halfData = data.slice(
    numberOfBtn * coutOfSlides - coutOfSlides,
    numberOfBtn * coutOfSlides
  );
  halfData.forEach((el, index) => {
    let { id, title, url, userImage, redirectLink, category } = el;
    elementsWrapper.innerHTML += templateBlogElements(
      id,
      title,
      url,
      userImage,
      redirectLink,
      category
    );
  });
}

function createButtons(data: cardTypeForPaginator[]): void {
  let dataLength: number = data.length;
  let counter: number = 0;
  if (dataLength % slides == 0) {
    for (let i = 0; i < dataLength / slides; i++) {
      counter += 1;
      if (counter > 5) {
        buttonsParent.innerHTML += templateButtons(i + 1);
      } else {
        buttonsParent.innerHTML += templateButtons(i + 1);
      }
    }
  } else {
    for (let i = 0; i < Math.ceil(dataLength / slides); i++) {
      counter += 1;
      if (counter > 5) {
        buttonsParent.innerHTML += templateButtons(i + 1);
      } else {
        buttonsParent.innerHTML += templateButtons(i + 1);
      }
    }
  }
  checkActiveButton(counter, data);
}
