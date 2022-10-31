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
  updateSlider(id, data) {
    if (this.bool) {
      this.slider = new PreferSlider(data);
      this.slider.initSlider();
      this.slider.setData(id);
      this.bool = false;
    } else {
      this.slider.setData(id);
    }
  }
  init() {
    hamburger();
    headerAppearsWithScroll();
    paginator(dataForPaginator);
    coursesSlider(dataForCoursesSlider);
    initForm();
    smoothScroll();
    let sel = new Select(
      "https://jsonplaceholder.typicode.com/photos/",
      this.updateSlider.bind(this)
    );
    sel.makeRequest();
    
  }
}
