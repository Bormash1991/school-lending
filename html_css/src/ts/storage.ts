import { CardTypeForSlickSlider } from "./models/types.model";
import { LocalStorage } from "./decorators/localStorage.decorator";
interface IStorage<T> {
  localData: T[];
  setData(data: Array<T>): void;
  getSliderData(): Array<T>;
}

export class Storage implements IStorage<CardTypeForSlickSlider> {
  @LocalStorage("dataForSlider")
  localData: CardTypeForSlickSlider[];

  public setData(data: CardTypeForSlickSlider[]): void {
    this.localData = data;
  }
  public getSliderData(): CardTypeForSlickSlider[] {
    return this.localData;
  }
}
