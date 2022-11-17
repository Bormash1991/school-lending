import { AlbumOptions } from "./models/enum.model";
import { Сallback } from "./models/callback.model";
interface ISelect<T> {
  initList(): void;
}
export class Select implements ISelect<Сallback> {
  private readonly select: string;
  private numberOflabel: number;
  private readonly selector: string;
  private changeCallback: Сallback;
  private list: HTMLDivElement;
  private label: HTMLDivElement;
  private span: HTMLSpanElement;
  private arrow: HTMLElement;
  private quantitiOfAlbumId: number;
  constructor(changeCallback: Сallback, selector: string) {
    this.numberOflabel;
    this.selector = selector;
    this.select = `.${this.selector}__label`;
    this.changeCallback = changeCallback;
    this.list;
    this.label;
    this.span;
    this.arrow;
    this.quantitiOfAlbumId = 3;
  }

  private onChange(value: number): void {
    this.changeCallback(value);
  }

  private get getSelect() {
    return this.select;
  }

  private templateButtonAndList(): string {
    return `
    <button class="label__button ${this.selector}__button">
        <span class="label__button_text ${this.selector}__button_text">Label</span>
        <i class="label__arrow ${this.selector}__arrow"></i>
    </button>
    <ul class="label__list ${this.selector}__list"></ul>
    `;
  }

  private initVariables(): void {
    this.list = document.querySelector(`.${this.selector}__list`);
    this.label = document.querySelector(`.${this.selector}__button`);
    this.span = document.querySelector(`.${this.selector}__button_text`);
    this.arrow = document.querySelector(`.${this.selector}__arrow`);
  }

  public initList(): void {
    let item = document.querySelector(this.getSelect) as HTMLDivElement;
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

  private addListItem(): void {
    for (let i = 0; i < this.quantitiOfAlbumId; i++) {
      this.list.innerHTML += this.labelTemplate(
        +Object.values(AlbumOptions)[i]
      );
    }
    this.span.textContent = "Label 1";
    this.onChange(1);
  }

  private labelTemplate(number: number): string {
    return `<li id="${number}" class="label__list-item ${this.selector}__list-item">Label ${number}</li>`;
  }

  private labelClickHandler(): void {
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
