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
window.addEventListener("DOMContentLoaded", () => {
  hamburger();
  headerAppearsWithScroll();
  paginator(dataForPaginator);
  coursesSlider(dataForCoursesSlider);
  let slider = new PreferSlider(dataForSlider);
  slider.initSlider();
});
