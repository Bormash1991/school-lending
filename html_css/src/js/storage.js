import {
  dataForPaginator,
  dataForCoursesSlider,
  dataForSlider,
} from "./data-for-sliders";
function setData(data) {
  if (!localStorage.getItem("dataForSlider")) {
    localStorage.setItem("dataForSlider", JSON.stringify(data));
  }
}
setData(dataForSlider);
export function getSliderData(data) {
  return JSON.parse(localStorage.getItem(data));
}
