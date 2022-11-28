import { CardTypeForSlickSlider } from "../models/types.model";
function storageType() {
  this.param ? localStorage : sessionStorage;
}
export function SessionStorageDec(target: Object, key: string) {
  Object.defineProperty(target, key, {
    get: function (): CardTypeForSlickSlider[] | [0, 0] {
      const dataType: Storage =
        this.typeOfStorage === "loc" ? localStorage : sessionStorage;
      if (dataType.getItem(this.key) != null) {
        return JSON.parse(dataType.getItem(this.key));
      } else {
        return [0, 0];
      }
    },
    set: function (data: CardTypeForSlickSlider[] | number[]): void {
      if (!storageType.bind(this).getItem(this.key)) {
        storageType.bind(this).setItem(this.key, JSON.stringify(data));
      }
    },
  });
}
