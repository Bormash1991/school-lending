import { LocalStorage } from "./decorators/localStorage.decorator";
import { SessionStorageDec } from "./decorators/sessionStorage.decorator";
interface IStorage {
  localData: any;
  setData<T>(data: Array<T> | [] | 0): void;
  getData<T>(): Array<T> | [] | 0;
}

export class Storage<T> implements IStorage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  @LocalStorage
  @SessionStorageDec
  localData: any;

  public setData<T>(data: Array<T> | [] | 0): void {
    this.localData = data;
  }
  public getData<T>(): Array<T> | [] | 0 {
    return this.localData;
  }
}
