let buttonsParent = document.querySelector(".blog__list"),
  elementsWrapper = document.querySelector(".blog__wrap-elements"),
  slides = 2,
  activeClass = "blog__btn_active",
  horizontal = false;
export function paginator(data) {
  createButtons(data);
  clickHandler(data);
}
function templateBlogElements({
  id,
  title,
  url,
  userImage,
  redirectLink,
  category,
}) {
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
function templateButtons(num, hidden = "") {
  return `
      <li class="blog__elem ">
                <button class="blog__btn ${hidden}">${num}</button>
              </li>
    `;
}
function checkWindowWidth() {
  if (window.innerWidth < 1440) {
    slides = 1;
  }
  if (window.innerWidth < 768) {
    horizontal = true;
  }
}
checkWindowWidth();
function checkActiveButton(count, data) {
  let btns = document.querySelectorAll(".blog__btn");
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
function clickHandler(data) {
  let btns = document.querySelectorAll(".blog__btn"),
    arrs = [...btns];
  buttonsParent.addEventListener("click", (e) => {
    let target = e.target;
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
          autoScrollListOfButtons(i, data, btns);
        }
      }
    });
  });
}
function setTransformValue(trigger) {
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
function autoScrollListOfButtons(index, data, btns) {
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
function createElements(data, numberOfBtn, coutOfSlides) {
  let halfData = data.slice(
    numberOfBtn * coutOfSlides - coutOfSlides,
    numberOfBtn * coutOfSlides
  );
  halfData.forEach((el, index) => {
    el;
    elementsWrapper.innerHTML += templateBlogElements(el);
  });
}
function createButtons(data) {
  let dataLength = data.length;
  let counter = 0;
  if (dataLength % slides == 0) {
    for (let i = 0; i < dataLength / slides; i++) {
      counter += 1;
      if (counter > 5) {
        buttonsParent.innerHTML += templateButtons(i + 1, "hidden");
      } else {
        buttonsParent.innerHTML += templateButtons(i + 1);
      }
    }
  } else {
    for (let i = 0; i < Math.ceil(dataLength / slides); i++) {
      counter += 1;
      if (counter > 5) {
        buttonsParent.innerHTML += templateButtons(i + 1, "hidden");
      } else {
        buttonsParent.innerHTML += templateButtons(i + 1);
      }
    }
  }
  checkActiveButton(counter, data);
}
