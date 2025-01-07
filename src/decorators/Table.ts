export function Table(name: string) {
  return function (constructor: Function) {
    constructor.prototype.tableName = name;
  };
}
