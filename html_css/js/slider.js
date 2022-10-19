export class PreferSlider {
  constructor(data) {
    this.translate = 0;
    this.coutOfClick = 0;
    this.data = data;
    this.numuberOfSlider = 0;
    this.numberOflabel = 0;
    this.slider = document.querySelector("#slider");
    this.nextButton;
    this.prevButton;
    this.label;
    this.span;
    this.list;
    this.box;
  }
  creatSliderСascade() {
    return `<div class="prefer__item-wrap">
             ${this.renderButtons("left")}
              <div class="prefer__item-box"></div>
            ${this.renderButtons("right")}
            </div> `;
  }
  renderButtons(side) {
    return ` <button
                class="slider-btn slider-btn_${side} prefer__slider-btn prefer__slider-btn-${side}"
              >
              ${this.templateButtons(side)}
              </button>`;
  }
  templateButtons(side) {
    return ` <svg class="slider-btn__img slider-btn__img-${side}">
                  <use href="img/sprite.svg#icon-${side}" width="10"></use>
                </svg>`;
  }
  initLabel() {
    let number = 0;
    this.data.forEach((elem, i) => {
      if (number == 0) {
        this.list.innerHTML += this.labelTemplate(elem.albumId);
      } else if (number != elem.albumId) {
        this.list.innerHTML += this.labelTemplate(elem.albumId);
      }
      number = elem.albumId;
    });
    this.setData(1, this.data);
  }
  checkWindowWidth() {
    if (window.innerWidth >= 1440) {
      return 4;
    }
    if (window.innerWidth < 1440 && window.innerWidth >= 768) {
      return 2;
    }
    if (window.innerWidth < 768) {
      return 1;
    }
  }
  labelTemplate(number) {
    return `<li id="${number}" class="prefer__list-item">Label ${number}</li>`;
  }
  labelClickHandler() {
    this.label.addEventListener("click", () => {
      this.list.classList.toggle("prefer__list_show");
    });
    this.list.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("prefer__list-item")) {
        this.list.classList.toggle("prefer__list_show");
        this.numberOflabel = target.getAttribute("id");
        this.span.textContent = target.textContent;
        this.setData(this.numberOflabel, this.data);
        this.prevSlide();
      }
    });
  }
  slideTemplate({ albumId, id, title, url, thumbnailUrl }) {
    return `  <a href="${thumbnailUrl}" id="${id}" class="prefer__item flex">
                <div class="prefer__overlay prefer__overlay_blue"
                style="background: url(${url}) center center/cover no-repeat;"></div>
                <div class="prefer__name">${title}</div></div>
              </a>`;
  }
  setData(number, data) {
    this.box.innerHTML = "";
    this.translate = 0;
    this.assignTranslate();
    this.numuberOfSlider = 0;
    this.coutOfClick = 0;
    this.data.forEach((elem, i) => {
      if (elem.albumId == number) {
        this.box.innerHTML += this.slideTemplate(elem);
        this.numuberOfSlider += 1;
      }
    });
  }
  assignTranslate() {
    this.box.style.cssText = `transform: translateX(${this.translate}px)`;
  }
  nextSlide() {
    if (this.coutOfClick < this.numuberOfSlider - this.checkWindowWidth()) {
      this.translate -= 217;
      this.coutOfClick += 1;
      this.assignTranslate();
    }
    if (this.coutOfClick == this.numuberOfSlider - this.checkWindowWidth()) {
      this.nextButton.style.opacity = "0.5";
    }
    if (this.translate != 0) {
      this.prevButton.style.opacity = "1";
    }
  }
  prevSlide() {
    if (this.translate != 0) {
      this.translate += 217;
      this.coutOfClick -= 1;
      this.assignTranslate();
    }
    if (this.translate == 0) {
      this.prevButton.style.opacity = "0.5";
    }
    if (this.coutOfClick < this.numuberOfSlider - this.checkWindowWidth()) {
      this.nextButton.style.opacity = "1";
    }
  }
  clickHendler() {
    this.nextButton.addEventListener("click", () => {
      this.nextSlide();
    });
    this.prevButton.addEventListener("click", () => {
      this.prevSlide();
    });
  }
  initSlider() {
    this.slider.innerHTML = this.creatSliderСascade();
    this.nextButton = document.querySelector(".prefer__slider-btn-right");
    this.prevButton = document.querySelector(".prefer__slider-btn-left");
    this.label = document.querySelector(".prefer__button");
    this.span = this.label.querySelector(".prefer__button_text");
    this.list = document.querySelector(".prefer__list");
    this.box = document.querySelector(".prefer__item-box");
    if (this.translate == 0) {
      this.prevButton.style.opacity = "0.5";
    }
    this.clickHendler();
    this.initLabel();
    this.labelClickHandler();
  }
}
