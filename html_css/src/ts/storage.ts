import { CardTypeForSlickSlider } from "./models/types.model";
import { LocalStorage } from "./decorators/localStorage.decorator";
import { typeOfStorage } from "./models/typeOfStrorage.model";
interface IStorage<T> {
  localData: any;
  setData(data: Array<T>): void;
  getData(): Array<T> | number[] | [];
}

export class Storage implements IStorage<CardTypeForSlickSlider> {
  key: string;
  typeOfStorage: typeOfStorage;
  constructor(key: string, typeOfStorage: typeOfStorage) {
    this.key = key;
    this.typeOfStorage = typeOfStorage;
  }

  @LocalStorage
  localData: any;

  public setData(data: CardTypeForSlickSlider[] | number[] | []): void {
    this.localData = data;
  }
  public getData(): CardTypeForSlickSlider[] | number[] | [] {
    return this.localData;
  }
}
