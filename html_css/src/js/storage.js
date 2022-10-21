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
    return JSON.parse(localStorage.getItem("dataForSlider"));
  }
}
