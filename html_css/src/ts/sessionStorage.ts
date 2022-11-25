import { SessionStorageDec } from "./decorators/sessionStorage.decorator";
export class SessionStorage {
  @SessionStorageDec("position")
  data: number[];

  public setData(position: number[]): void {
    this.data = position;
  }
  public getData() {
    return this.data;
  }
}
