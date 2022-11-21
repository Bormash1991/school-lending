import { cardTypeForSlickSlider } from "../models/types.model";
export function LocalStorage(keyData: string) {
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
