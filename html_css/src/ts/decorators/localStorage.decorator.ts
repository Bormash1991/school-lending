export function LocalStorage(target: Object, key: string): void {
  const saveLocalStorage = <T>(data: T | Array<T>, keyData: string): void => {
    localStorage.setItem(keyData, JSON.stringify(data));
  };
  target["arrMethods"].push(saveLocalStorage);
  Object.defineProperty(target, key, {
    get: function <T>(): Array<T> | 0 | number[] {
      const dataType: Storage =
        this.typeOfStorage === "loc" ? localStorage : sessionStorage;
      if (dataType.getItem(this.key) != null) {
        return JSON.parse(dataType.getItem(this.key));
      }
      return this.key === "dataForSlider" ? 0 : [0, 0];
    },
    set: function <T>(data: Array<T> | number[]): void {
      const keyOfData = this.key;
      target["arrMethods"].forEach((el: Function) => {
        el.call(this, data, keyOfData);
      });
    },
    configurable: true,
  });
}
