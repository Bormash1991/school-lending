export class PreferSlider {
  constructor(id, selector) {
    this.translate = 0;
    this.coutOfClick = 0;
    this.numberOfSlider = 0;
    this.numberOflabel = 0;
    this.slider = document.querySelector(`#${id}`);
    this.nextButton;
    this.prevButton;
    this.box;
    this.selector = selector;
  }

  creatSliderСascade() {
    return `<div class="slider__item-wrap ${this.selector}__item-wrap">
             ${this.renderButtons("left")}
              <div class="slider__item-box ${this.selector}__item-box"></div>
            ${this.renderButtons("right")}
            </div> `;
  }

  renderButtons(side) {
    return ` <button
                class="slider-btn slider-btn_${side} ${
      this.selector
    }__slider-btn ${this.selector}__slider-btn-${side}"
              >
              ${this.templateButtons(side)}
              </button>`;
  }

  templateButtons(side) {
    return ` <svg class="slider-btn__img slider-btn__img-${side}">
                  <use href="img/sprite.svg#icon-${side}" width="10"></use>
                </svg>`;
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

  slideTemplate({ albumId, id, title, url, thumbnailUrl }) {
    return `  <a href="${thumbnailUrl}" id="${id}" class="slider__item ${this.selector}__item flex">
                <div class="${this.selector}__overlay ${this.selector}__overlay_blue"
                style="background: url(${url}) center center/cover no-repeat;"></div>
                <div class="${this.selector}__name">${title}</div></div>
              </a>`;
  }

  setData(data) {
    this.box.innerHTML = "";
    this.translate = 0;
    this.assignTranslate();
    this.numberOfSlider = 0;
    this.coutOfClick = 0;
    data = data.slice(0, 7);
    data.forEach((elem, i) => {
      this.box.innerHTML += this.slideTemplate(elem);
      this.numberOfSlider += 1;
    });
    this.prevSlide();
  }

  assignTranslate() {
    this.box.style.cssText = `transform: translateX(${this.translate}px)`;
  }

  nextSlide() {
    if (this.coutOfClick < this.numberOfSlider - this.checkWindowWidth()) {
      this.translate -= 217;
      this.coutOfClick += 1;
      this.assignTranslate();
    }
    if (this.coutOfClick == this.numberOfSlider - this.checkWindowWidth()) {
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
    if (this.coutOfClick < this.numberOfSlider - this.checkWindowWidth()) {
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
    this.nextButton = document.querySelector(
      `.${this.selector}__slider-btn-right`
    );
    this.prevButton = document.querySelector(
      `.${this.selector}__slider-btn-left`
    );
    this.box = document.querySelector(`.${this.selector}__item-box`);
    this.prevSlide();
    this.clickHendler();
  }
}
