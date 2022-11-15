import { AlbumOptions } from "./models/enum.model";
import { callback } from "./models/callback.model";
export class Select {
  #select: string;
  numberOflabel: number;
  selector: string;
  data: [];
  changeCallback: callback;
  list: HTMLDivElement;
  label: HTMLDivElement;
  span: HTMLSpanElement;
  arrow: HTMLElement;
  quantitiOfAlbumId: number;
  constructor(changeCallback: callback, selector: string) {
    this.numberOflabel;
    this.selector = selector;
    this.#select = `.${this.selector}__label`;
    this.data;
    this.changeCallback = changeCallback;
    this.list;
    this.label;
    this.span;
    this.arrow;
    this.quantitiOfAlbumId = 3;
  }

  onChange(value: number): void {
    this.changeCallback(value);
  }

  get select() {
    return this.#select;
  }

  templateButtonAndList(): string {
    return `
    <button class="label__button ${this.selector}__button">
        <span class="label__button_text ${this.selector}__button_text">Label</span>
        <i class="label__arrow ${this.selector}__arrow"></i>
    </button>
    <ul class="label__list ${this.selector}__list"></ul>
    `;
  }

  initVariables(): void {
    this.list = document.querySelector(`.${this.selector}__list`);
    this.label = document.querySelector(`.${this.selector}__button`);
    this.span = document.querySelector(`.${this.selector}__button_text`);
    this.arrow = document.querySelector(`.${this.selector}__arrow`);
  }

  initList(): void {
    let item = document.querySelector(this.select) as HTMLDivElement;
    item.classList.add("label");
    item.innerHTML = this.templateButtonAndList();
    this.initVariables();
    if (this.quantitiOfAlbumId != 2) {
      this.labelClickHandler();
    } else {
      this.label.classList.add("label__button_disabled");
    }
    this.addListItem();
  }

  addListItem(): void {
    for (let i = 0; i < this.quantitiOfAlbumId; i++) {
      this.list.innerHTML += this.labelTemplate(
        +Object.values(AlbumOptions)[i]
      );
    }
    this.onChange(1);
  }

  labelTemplate(number: number): string {
    return `<li id="${number}" class="label__list-item ${this.selector}__list-item">Label ${number}</li>`;
  }

  labelClickHandler(): void {
    this.label.addEventListener("click", () => {
      this.label.classList.toggle(`${this.selector}__button_active`);
      this.label.classList.toggle("label__button_active");
      this.list.classList.toggle("label__list_show");
      this.arrow.classList.toggle(`${this.selector}__arrow_active`);
      this.arrow.classList.toggle("label__arrow_active");
    });
    this.list.addEventListener("click", (e: Event) => {
      let target = e.target as HTMLDivElement;
      if (target.classList.contains(`${this.selector}__list-item`)) {
        this.list.classList.toggle(`${this.selector}__list_show`);
        this.list.classList.toggle("label__list_show");
        this.numberOflabel = +target.getAttribute("id");
        this.span.textContent = target.textContent;
        this.label.classList.toggle(`${this.selector}__button_active`);
        this.label.classList.toggle("label__button_active");
        this.arrow.classList.toggle("label__arrow_active");
        this.arrow.classList.toggle(`${this.selector}__arrow_active`);
        this.onChange(+Object.values(AlbumOptions)[this.numberOflabel - 1]);
      }
    });
  }
}
