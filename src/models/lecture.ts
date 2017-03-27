import {Building} from './building';
import {Module} from './module';

export class Lecture {
  private _building: Building;
  private _finishTime: Date;
  private _module: Module;
  private _lecturer: String;
  private _room: String;
  private _startTime: Date;

  constructor(module: Module, lecturer: String, building: Building, room: String, startTime: Date, finishTime: Date) {
    this.building = building;
    this.finishTime = finishTime;
    this.module = module;
    this.lecturer = lecturer;
    this.room = room;
    this.startTime = startTime;
  }

  get building(): Building {
    return this._building;
  }

  set building(value: Building) {
    this._building = value;
  }

  get finishTime(): Date {
    return this._finishTime;
  }

  set finishTime(value: Date) {
    this._finishTime = value;
  }

  get module(): Module {
    return this._module;
  }

  set module(value: Module) {
    this._module = value;
  }

  get lecturer(): String {
    return this._lecturer;
  }

  set lecturer(value: String) {
    this._lecturer = value;
  }

  get room(): String {
    return this._room;
  }

  set room(value: String) {
    this._room = value;
  }

  get startTime(): Date {
    return this._startTime;
  }

  set startTime(value: Date) {
    this._startTime = value;
  }
}
