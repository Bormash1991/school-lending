let buttonsParent = document.querySelector(".blog__list"),
  elementsWrapper = document.querySelector(".blog__wrap-elements"),
  slides = 2,
  activeClass = "blog__btn_active";
export function paginator(data) {
  createButtons(data);
  clickHandler(data);
}
function templateBlogElements(id, title, url, thumbnailUrl) {
  return `
              <div id="${id}" class="blog__wrap-item flex_justify-c">
                <div class="blog__wrap-left">
                  <div class="blog__name">DESIGN</div>
                  <img
                    src="img/blog/persone/second.jpg"
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
                  <a href="${thumbnailUrl}" class="blog__more">Read Now</a>
                </div>
              </div>
        `;
}
function templateButtons(num) {
  return `
      <li class="blog__elem ">
                <button class="blog__btn">${num}</button>
              </li>
    `;
}
function checkWindowWidth() {
  if (window.innerWidth < 1440) {
    slides = 1;
  }
}
checkWindowWidth();
function checkActiveButton(count, data) {
  let btns = document.querySelectorAll(".blog__btn");
  if (count % 2 == 0) {
    btns[0].classList.add(activeClass);
    createElements(data, 1, slides);
  } else {
    let num = Math.trunc(count / 2);
    btns[num].classList.add(activeClass);
    createElements(data, num + 1, slides);
  }

  clickHandler(data);
}
function clickHandler(data) {
  let btns = document.querySelectorAll(".blog__btn"),
    arrs = [...btns];
  buttonsParent.addEventListener("click", (e) => {
    let target = e.target;
    arrs.forEach((elem, i) => {
      if (target == elem) {
        arrs.forEach((e, index) => {
          if (e.classList.contains(activeClass)) {
            e.classList.remove(activeClass);
          }
        });
        elem.classList.add(activeClass);
        elementsWrapper.innerHTML = "";
        createElements(data, i + 1, slides);
      }
    });
  });
}

function createElements(data, numberOfBtn, coutOfSlides) {
  let halfData = data.slice(
    numberOfBtn * coutOfSlides - coutOfSlides,
    numberOfBtn * coutOfSlides
  );
  halfData.forEach((el, index) => {
    let { id, title, url, thumbnailUrl } = el;
    elementsWrapper.innerHTML += templateBlogElements(
      id,
      title,
      url,
      thumbnailUrl
    );
  });
}
function createButtons(data) {
  let dataLength = data.length;
  let counter = 0;
  if (dataLength % slides == 0) {
    for (let i = 0; i < dataLength / slides; i++) {
      buttonsParent.innerHTML += templateButtons(i + 1);
      counter += 1;
    }
  } else {
    for (let i = 0; i < Math.ceil(dataLength / slides); i++) {
      buttonsParent.innerHTML += templateButtons(i + 1);
      counter += 1;
    }
  }
  checkActiveButton(counter, data);
}
