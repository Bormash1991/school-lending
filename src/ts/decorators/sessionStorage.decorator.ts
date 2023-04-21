export function SessionStorageDec(target: Object, key: string) {
  target["arrMethods"] = [];
  const saveSessionStorage = <T>(data: T | Array<T>, keyData: string): void => {
    sessionStorage.setItem(keyData, JSON.stringify(data));
  };
  target["arrMethods"].push(saveSessionStorage);
  Object.defineProperty(target, key, {
    get: function <T>(): Array<T> | 0 | number[] {
      const dataType: Storage =
        this.typeOfStorage === "loc" ? localStorage : sessionStorage;
      if (dataType.getItem(this.key) != null) {
        return JSON.parse(dataType.getItem(this.key));
      }
      return this.key === "dataForSlider" ? 0 : [0, 0];
    },
    configurable: true,
  });
}
