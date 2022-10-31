import { hamburger } from "./mobile-menu.js";
import { headerAppearsWithScroll } from "./header-scroll.js";
import { paginator } from "./paginator.js";
import { coursesSlider } from "./courses-slider.js";
import { PreferSlider } from "./slider.js";
import {
  dataForPaginator,
  dataForCoursesSlider,
  dataForSlider,
} from "./data-for-sliders.js";
import { initForm } from "./form";
import { smoothScroll } from "./scroll.js";
import { Select } from "./select";
export class App {
  constructor() {
    this.slider;
    this.bool = true;
  }
  async getSliderData(num = 1) {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${num}/photos`
    );

    return await response.json();
  }
  async updateSlider(id) {
    this.slider.setData(await this.getSliderData(id));
  }
  async init() {
    hamburger();
    headerAppearsWithScroll();
    paginator(dataForPaginator);
    coursesSlider(dataForCoursesSlider);
    initForm();
    smoothScroll();
    this.slider = new PreferSlider();
    this.slider.initSlider();
    let response = await this.getSliderData();
    this.slider.setData(response);
    let sel = new Select(this.updateSlider.bind(this)).initList();
  }
}
