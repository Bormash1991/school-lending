import { hamburger } from "./mobile-menu.js";
import { headerAppearsWithScroll } from "./header-scroll.js";
import { paginator } from "./paginator.js";
import { coursesSlider } from "./courses-slider.js";
import { PreferSlider } from "./slider.js";
import { dataForPaginator, dataForCoursesSlider } from "./data-for-sliders.js";
import { getSliderData } from "./storage.js";

import { initForm } from "./form";
export class App {
  constructor() {}
  init() {
    hamburger();
    headerAppearsWithScroll();
    paginator(dataForPaginator);
    coursesSlider(dataForCoursesSlider);
    new PreferSlider(getSliderData("dataForSlider")).initSlider();
    initForm();
  }
}
