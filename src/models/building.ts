export class Building {
  private _code: String;
  private _id: Number;
  private _lat: Number = 51.88694;
  private _lng: Number = -2.08864;
  private _name: String;

  constructor(id: Number, code: String, name: String, lat: Number, lng: Number) {
    this.code = code;
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
  }

  get code(): String {
    return this._code;
  }

  set code(value: String) {
    this._code = value;
  }

  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
  }

  get lat(): Number {
    return this._lat;
  }

  set lat(value: Number) {
    this._lat = value;
  }

  get lng(): Number {
    return this._lng;
  }

  set lng(value: Number) {
    this._lng = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }
}
