export function SessionStorageDec(keyData: string) {
  return function (target: Object, key: string) {
    const getter = () => {
      if (sessionStorage.getItem(keyData) != null) {
        return JSON.parse(sessionStorage.getItem(keyData));
      } else {
        return [0, 0];
      }
    };
    const setter = (data: number) => {
      sessionStorage.setItem(keyData, JSON.stringify(data));
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
    });
  };
}
