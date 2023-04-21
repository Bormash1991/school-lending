import { CardTypeForNativeSlider } from "./models/types.model";
import { Storage } from "./storage";
type NativeId = "slider";
type NativeSelector = "prefer";
export class PreferSlider {
  private translate: number;
  private coutOfClick: number;
  private numberOfSlider: number;
  private numberOflabel: number;
  private readonly slider: HTMLDivElement;
  private nextButton: HTMLDivElement;
  private prevButton: HTMLDivElement;
  private box: HTMLDivElement;
  private readonly selector: string;
  private storage: Storage<number>;
  constructor(id: NativeId, selector: NativeSelector) {
    this.translate;
    this.coutOfClick;
    this.numberOfSlider = 0;
    this.numberOflabel = 0;
    this.slider = document.querySelector(`#${id}`);
    this.nextButton;
    this.prevButton;
    this.box;
    this.selector = selector;
    this.storage = new Storage<number>("position");
  }

  private creatSliderСascade(): string {
    return `<div class="slider__item-wrap ${this.selector}__item-wrap">
             ${this.renderButtons("left")}
              <div class="slider__item-box ${this.selector}__item-box"></div>
            ${this.renderButtons("right")}
            </div> `;
  }

  private renderButtons(side: string): string {
    return ` <button
                class="slider-btn slider-btn_${side} ${
      this.selector
    }__slider-btn ${this.selector}__slider-btn-${side}"
              >
              ${this.templateButtons(side)}
              </button>`;
  }

  private templateButtons(side: string) {
    return ` <svg class="slider-btn__img slider-btn__img-${side}">
                  <use href="img/sprite.svg#icon-${side}" width="10"></use>
                </svg>`;
  }

  private checkWindowWidth(): number {
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

  private slideTemplate({
    albumId,
    id,
    title,
    url,
    thumbnailUrl,
  }: CardTypeForNativeSlider) {
    return `  <a href="${thumbnailUrl}" id="${id}" class="slider__item ${this.selector}__item flex">
                <div class="${this.selector}__overlay ${this.selector}__overlay_blue"
                style="background: url(${url}) center center/cover no-repeat;"></div>
                <div class="${this.selector}__name">${title}</div></div>
              </a>`;
  }

  public setData(data: CardTypeForNativeSlider[] | []): void {
    this.box.innerHTML = "";
    let dataStorage = this.storage.getData<number>();
    this.translate = dataStorage[0];
    this.coutOfClick = dataStorage[1];
    this.storage.setData(dataStorage);
    this.assignTranslate();
    this.numberOfSlider = 0;
    data = data.slice(0, 7);
    if (data.length == 0) {
      let err: HTMLDivElement = document.createElement("div");
      err.innerText = "data fetch error";
      err.classList.add("error");
      this.slider.innerHTML = "";
      this.slider.appendChild(err);
    }
    data.forEach((elem, i) => {
      this.box.innerHTML += this.slideTemplate(elem);
      this.numberOfSlider += 1;
    });
    this.checkActiveRightButton();
    this.checkActiveLeftButton();
  }

  private assignTranslate(): void {
    this.box.style.cssText = `transform: translateX(${this.translate}px)`;
  }

  private nextSlide(): void {
    if (this.coutOfClick < this.numberOfSlider - this.checkWindowWidth()) {
      this.translate -= 217;
      this.coutOfClick += 1;
      this.storage.setData<number>([this.translate, this.coutOfClick]);
      this.assignTranslate();
    }
    this.checkActiveLeftButton();
  }
  checkActiveLeftButton() {
    if (this.coutOfClick == this.numberOfSlider - this.checkWindowWidth()) {
      this.nextButton.style.opacity = "0.5";
    }
    if (this.translate != 0) {
      this.prevButton.style.opacity = "1";
    }
  }
  checkActiveRightButton() {
    if (this.translate == 0) {
      this.prevButton.style.opacity = "0.5";
    }
    if (this.coutOfClick < this.numberOfSlider - this.checkWindowWidth()) {
      this.nextButton.style.opacity = "1";
    }
  }
  private prevSlide(): void {
    if (this.translate != 0) {
      this.translate += 217;
      this.coutOfClick -= 1;
      this.storage.setData<number>([this.translate, this.coutOfClick]);
      this.assignTranslate();
    }
    this.checkActiveRightButton();
  }

  private clickHendler(): void {
    this.nextButton.addEventListener("click", () => {
      this.nextSlide();
    });
    this.prevButton.addEventListener("click", () => {
      this.prevSlide();
    });
  }

  public initSlider(): void {
    this.slider.innerHTML = this.creatSliderСascade();
    this.nextButton = document.querySelector(
      `.${this.selector}__slider-btn-right`
    );
    this.prevButton = document.querySelector(
      `.${this.selector}__slider-btn-left`
    );
    this.box = document.querySelector(`.${this.selector}__item-box`);
    this.checkActiveRightButton();
    this.checkActiveLeftButton();
    this.clickHendler();
  }
}
