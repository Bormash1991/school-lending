let sliderWrap = document.querySelector(".course__slider-wrap");
export function coursesSlider(data) {
  addSlides(data);
  initSlickSlider();
}

function starsCounter(stars) {
  let starsString = "";
  if (stars == 5) {
    for (let i = 0; i < stars; i++) {
      starsString += ` <img
                      src="img/course/star.svg"
                      alt="star"
                      class="star-wrap__star"
                      width="10"
                    />`;
    }
  } else {
    for (let i = 0; i < stars; i++) {
      starsString += ` <img
                      src="img/course/star.svg"
                      alt="star"
                      class="star-wrap__star"
                      width="10"
                    />`;
    }
    for (let i = 0; i < 5 - stars; i++) {
      starsString += ` <img
                     src="img/course/empty-star.svg"
                      alt="star"
                      class="star-wrap__star"
                      width="10"
                    />`;
    }
  }
  return starsString;
}
function addSlides(data) {
  data.forEach((elem, i) => {
    sliderWrap.innerHTML += slideTemplate(elem);
  });
}
function slideTemplate(elem) {
  let stars = starsCounter(elem.countOfStars);
  let {
    id,
    personImg,
    backUrl,
    category,
    title,
    price,
    oldPrice,
    countOfStars,
  } = elem;
  return ` <div>
  <a id= ${id} href="#" class="course__item  price-item" 
   style="background: url('${backUrl}') center
                      center / cover no-repeat;
                  ">
                <div class="price-item__overlay"></div>
                <img
                  src="${personImg}"
                  alt="person"
                  class="price-item__img"
                  width="48"
                />
                <h4 class="price-item__title">${category}</h4>
                <div class="price-item__subtitle">${title}</div>
                <div class="price-item__line"></div>
                <div class="price-item__bottom-wrap">
                  <div class="price-item__price-wrap">
                    <div class="price-item__price">$${price}</div>
                    <div class="price-item__price-old">$${oldPrice}</div>
                  </div>
                  <div class="price-item__star-wrap star-wrap">
                  ${stars}
                    <div class="star-wrap__text">(${countOfStars})</div>
                  </div>
                </div>
              </a></div>`;
}
function initSlickSlider() {
  $(".course__slider-wrap").slick({
    slidesToShow: 3,
    speed: 500,
    prevArrow: document.querySelector(".course__slider-btn_left"),
    nextArrow: document.querySelector(".course__slider-btn_right"),
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          centerMode: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  });
}
