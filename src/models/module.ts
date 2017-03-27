export class Module {
  private _code: String;
  private _name: String;

  constructor(code: String, name: String) {
    this.code = code;
    this.name = name;
  }

  get code(): String {
    return this._code;
  }

  set code(value: String) {
    this._code = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }
}
