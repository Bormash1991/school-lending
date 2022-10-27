export class Storage {
  constructor() {}
  setData(data) {
    if (!localStorage.getItem("dataForSlider")) {
      localStorage.setItem("dataForSlider", JSON.stringify(data));
    }
  }
  getSliderData() {
    if (localStorage.getItem("dataForSlider") != null) {
      return JSON.parse(localStorage.getItem("dataForSlider"));
    } else {
      return [];
    }
  }
}
