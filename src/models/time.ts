export class Time {
  private _hours: String;
  private _minutes: String;
  private _time: String;

  constructor(time: String) {
    this.hours = time.substring(0, 2);
    this.minutes = time.substring(3, 5);
    this.time = time;
  }

  get hours(): String {
    return this._hours;
  }

  set hours(value: String) {
    this._hours = value;
  }

  get minutes(): String {
    return this._minutes;
  }

  set minutes(value: String) {
    this._minutes = value;
  }

  get time(): String {
    return this._time;
  }

  set time(value: String) {
    this._time = value;
  }
}
