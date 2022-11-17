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
import { cardTypeForNativeSlider } from "./models/types.model";
abstract class IApp {
  protected readonly BASE_URL: string;
  constructor() {
    this.BASE_URL = "https://jsonplaceholder.typicode.com/albums/";
  }
  protected getSliderData(num: number): any {}
}
export class App extends IApp {
  protected slider: PreferSlider;
  constructor() {
    super();
    this.slider;
  }

  protected async getSliderData(
    num: number = 1
  ): Promise<cardTypeForNativeSlider[]> {
    let response = await fetch(`${this.BASE_URL}${num}/photos`);
    return await response.json();
  }

  private async updateSlider(id: number) {
    this.slider.setData(await this.getSliderData(id));
  }

  public async init() {
    hamburger();
    headerAppearsWithScroll();
    paginator(dataForPaginator as any);
    coursesSlider(dataForCoursesSlider as any, "course__slider-wrap");
    initForm();
    smoothScroll();
    this.slider = new PreferSlider("slider", "prefer");
    this.slider.initSlider();
    let response = await this.getSliderData();
    this.slider.setData(response);
    new Select(this.updateSlider.bind(this), "prefer").initList();
    customersPaginator(dataForCustomersSlider as any);
  }
}
