import { cardTypeForSlickSlider } from "./models/types.model";
import { dataForCoursesSlider } from "./data-for-sliders";
interface IStorage<T> {
  setData(data: Array<T>): void;
  getSliderData(): Array<T>;
}
function LocalStorage(keyData: string, data: any) {
  return function (target: any, key: any) {
    const getter = () => {
      if (localStorage.getItem(keyData) != null) {
        return JSON.parse(localStorage.getItem(keyData));
      } else {
        return [];
      }
    };
    const setter = () => {
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
  @LocalStorage("dataForSlider", dataForCoursesSlider)
  localData: any = "";

  public setData<T>(data: T[]): void {
    this.localData = data;
  }
  public getSliderData<T>(): T[] {
    return this.localData;
  }
}



