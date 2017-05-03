import {Building} from './building';

export class Course {
  private _building: Building;
  private _description: String;
  private _id: Number;
  private _name: String;
  private _synopsis: String;

  constructor(id: Number, name: String, synopsis: String, description: String, building: Building) {
    this.building = building;
    this.description = description;
    this.id = id;
    this.name = name;
    this.synopsis = synopsis;
  }

  get building(): Building {
    return this._building;
  }

  set building(value: Building) {
    this._building = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get synopsis(): String {
    return this._synopsis;
  }

  set synopsis(value: String) {
    this._synopsis = value;
  }
}
