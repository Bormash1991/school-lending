export class Select {
  #select;
  constructor(url, changeCallback) {
    this.numberOflabel;
    this.BASE_URL = url;
    this.#select = ".prefer__label";
    this.data;
    this.changeCallback = changeCallback;
    this.list;
    this.label;
    this.span;
    this.arrow;
    this.quantitiOfAlbumId = 0;
  }
  onChange(value) {
    this.changeCallback(value, this.data);
  }
  makeRequest() {
    fetch(this.BASE_URL)
      .then((response) => response.json())
      .then((result) => {
        this.calculatingData(result);
      });
  }
  get select() {
    return this.#select;
  }
  calculatingData(result) {
    let arr = [];
    let id = 0;
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (id != result[i].albumId) {
        count = 0;
        this.quantitiOfAlbumId += 1;
      }
      if (count == 7) {
        continue;
      }
      if (result[i].albumId <= 3) {
        arr.push(result[i]);
        count += 1;
        id = result[i].albumId;
      } else {
        break;
      }
    }
    this.data = arr;
    this.initList();
  }
  templateButtonAndList() {
    return `
    <button class="prefer__button">
        <span class="prefer__button_text">Label</span>
        <i class="prefer__arrow"></i>
    </button>
    <ul class="prefer__list"></ul>
    `;
  }
  initVariables() {
    this.list = document.querySelector(".prefer__list");
    this.label = document.querySelector(".prefer__button");
    this.span = document.querySelector(".prefer__button_text");
    this.arrow = document.querySelector(".prefer__arrow");
  }
  initList() {
    let item = document.querySelector(this.select);
    item.innerHTML = this.templateButtonAndList();
    this.initVariables();
    if (this.quantitiOfAlbumId != 2) {
      this.labelClickHandler();
    } else {
      this.label.classList.add("prefer__button_disabled");
    }
    this.addListItem();
  }
  addListItem() {
    let number = 0;
    this.data.forEach((elem, i) => {
      if (number == 0) {
        this.list.innerHTML += this.labelTemplate(elem.albumId);
      } else if (number != elem.albumId) {
        this.list.innerHTML += this.labelTemplate(elem.albumId);
      }
      number = elem.albumId;
    });
    this.onChange(1);
  }
  labelTemplate(number) {
    return `<li id="${number}" class="prefer__list-item">Label ${number}</li>`;
  }
  labelClickHandler() {
    this.label.addEventListener("click", () => {
      this.label.classList.toggle("prefer__button_active");
      this.list.classList.toggle("prefer__list_show");
      this.arrow.classList.toggle("prefer__arrow_active");
    });
    this.list.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains("prefer__list-item")) {
        this.list.classList.toggle("prefer__list_show");
        this.numberOflabel = target.getAttribute("id");
        this.span.textContent = target.textContent;
        this.label.classList.toggle("prefer__button_active");
        this.arrow.classList.remove("prefer__arrow_active");
        this.onChange(this.numberOflabel);
      }
    });
  }
}
