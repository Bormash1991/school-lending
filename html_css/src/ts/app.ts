import { hamburger } from "./mobile-menu";
import { headerAppearsWithScroll } from "./header-scroll";
import { paginator } from "./paginator";
import { coursesSlider } from "./courses-slider";
import { PreferSlider } from "./slider";
import {
  dataForPaginator,
  dataForCoursesSlider,
  dataForCustomersSlider,
} from "./data-for-sliders";
import { initForm } from "./form";
import { smoothScroll } from "./scroll";
import { Select } from "./select";
import { customersPaginator } from "./customers-paginator";

export class App {
  slider: PreferSlider;
  baseUrl: string;
  constructor() {
    this.slider;
    this.baseUrl;
  }

  async getSliderData(num: number = 1) {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${num}/photos`
    );
    return await response.json();
  }

  async updateSlider(id: number) {
    this.slider.setData(await this.getSliderData(id));
  }

  async init() {
    hamburger();
    headerAppearsWithScroll();
    paginator(dataForPaginator as []);
    coursesSlider(dataForCoursesSlider as [], "course__slider-wrap");
    initForm();
    smoothScroll();
    this.slider = new PreferSlider("slider", "prefer");
    this.slider.initSlider();
    let response = await this.getSliderData();
    this.slider.setData(response);
    new Select(this.updateSlider.bind(this), "prefer").initList();
    customersPaginator(dataForCustomersSlider as []);
  }
}
