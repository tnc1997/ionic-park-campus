export class Setting {
  private _key: String;
  private _value: any;

  constructor(key: String, value: any) {
    this.key = key;
    this.value = value;
  }

  get key(): String {
    return this._key;
  }

  set key(value: String) {
    this._key = value;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }
}
