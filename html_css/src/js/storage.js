export class Storage {
  constructor(data) {
    this.data = data;
    this.setData();
  }
  setData() {
    if (!localStorage.getItem("dataForSlider")) {
      localStorage.setItem("dataForSlider", JSON.stringify(this.data));
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
