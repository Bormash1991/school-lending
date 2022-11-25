import { CardTypeForSlickSlider } from "../models/types.model";
export function LocalStorage(keyData: string) {
  return function (target: Object, key: string) {
    const getter = () => {
      if (localStorage.getItem(keyData) != null) {
        return JSON.parse(localStorage.getItem(keyData));
      } else {
        return 0;
      }
    };
    const setter = (data: CardTypeForSlickSlider[]) => {
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
