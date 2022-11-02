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
    coursesSlider(dataForCoursesSlider, "course__slider-wrap");
    initForm();
    smoothScroll();
    this.slider = new PreferSlider("slider", "prefer");
    this.slider.initSlider();
    let response = await this.getSliderData();
    this.slider.setData(response);
    new Select(this.updateSlider.bind(this), "prefer").initList();
  }
}
