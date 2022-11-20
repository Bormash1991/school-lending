import { cardTypeForSlickSlider } from "./models/types.model";
import { dataForCoursesSlider } from "./data-for-sliders";
interface IStorage<T> {
  localData: T[];
  setData(data: Array<T>): void;
  getSliderData(): Array<T>;
}
function LocalStorage(keyData: string) {
  return function (target: Object, key: string) {
    const getter = () => {
      if (localStorage.getItem(keyData) != null) {
        return JSON.parse(localStorage.getItem(keyData));
      } else {
        return [];
      }
    };
    const setter = (data: cardTypeForSlickSlider[]) => {
      if (!localStorage.getItem(keyData)) {
        localStorage.setItem(keyData, JSON.stringify(data));
      }
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
    });
  };
}
export class Storage implements IStorage<cardTypeForSlickSlider> {
  @LocalStorage("dataForSlider")
  localData: cardTypeForSlickSlider[];

  public setData(data: cardTypeForSlickSlider[]): void {
    this.localData = data;
  }
  public getSliderData(): cardTypeForSlickSlider[] {
    return this.localData;
  }
}
