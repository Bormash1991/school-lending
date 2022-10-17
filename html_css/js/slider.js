let nextButton = document.querySelector(".prefer__slider-btn-r"),
  prevButton = document.querySelector(".prefer__slider-btn-l"),
  label = document.querySelector(".prefer__button"),
  span = label.querySelector(".prefer__button_text"),
  list = document.querySelector(".prefer__list"),
  item = document.querySelector(".prefer__item"),
  box = document.querySelector(".prefer__item-box"),
  numberOflabel = 0;
export class PreferSlider {
  constructor(data) {
    this.translate = 0;
    this.coutOfClick = 0;
    this.data = data;
    this.numuberOfSlider = 0;
  }
  initLabel() {
    let number = 0;
    this.data.forEach((elem, i) => {
      if (number == 0) {
        list.innerHTML += this.labelTemplate(elem.albumId);
      } else if (number != elem.albumId) {
        list.innerHTML += this.labelTemplate(elem.albumId);
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
    label.addEventListener("click", () => {
      list.classList.toggle("prefer__list_show");
    });
    list.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("prefer__list-item")) {
        list.classList.toggle("prefer__list_show");
        numberOflabel = target.getAttribute("id");
        span.textContent = target.textContent;
        this.setData(numberOflabel, this.data);
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
    box.innerHTML = "";
    this.translate = 0;
    this.assignTranslate();
    this.numuberOfSlider = 0;
    this.coutOfClick = 0;
    this.data.forEach((elem, i) => {
      if (elem.albumId == number) {
        box.innerHTML += this.slideTemplate(elem);
        this.numuberOfSlider += 1;
      }
    });
  }
  assignTranslate() {
    box.style.cssText = `transform: translateX(${this.translate}px)`;
  }
  nextSlide() {
    if (this.coutOfClick < this.numuberOfSlider - this.checkWindowWidth()) {
      this.translate -= 217;
      this.coutOfClick += 1;
      this.assignTranslate();
    }
  }
  prevSlide() {
    if (this.translate != 0) {
      this.translate += 217;
      this.coutOfClick -= 1;
      this.assignTranslate();
    }
  }
  clickHendler() {
    nextButton.addEventListener("click", () => {
      this.nextSlide();
    });
    prevButton.addEventListener("click", () => {
      this.prevSlide();
    });
  }
}
