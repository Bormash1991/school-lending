import { CardTypeForSlickSlider } from "../models/types.model";

export function LocalStorage(target: Object, key: string): void {
  Object.defineProperty(target, key, {
    get: function (): CardTypeForSlickSlider[] | 0 | number[] {
      const dataType: Storage =
        this.typeOfStorage === "loc" ? localStorage : sessionStorage;
      if (dataType.getItem(this.key) != null) {
        return JSON.parse(dataType.getItem(this.key));
      }
      return this.typeOfStorage === "loc" ? 0 : [0, 0];
    },
    set: function (data: CardTypeForSlickSlider[] | number[]): void {
      const dataType: Storage =
        this.typeOfStorage === "loc" ? localStorage : sessionStorage;
      dataType.setItem(this.key, JSON.stringify(data));
    },
  });
}
