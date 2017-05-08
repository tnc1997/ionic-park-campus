import {Component }from '@angular/core';
import {NavController} from 'ionic-angular';
import {Lecture} from '../../models/lecture';
import {Time} from '../../models/time';
import {LectureProvider} from '../../providers/providers';
import {Map} from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * The home page is the first page that the user is taken to if they have already completed the setup process. It
 * displays the next lecture at the top of the page, with all lectures listed beneath.
 */
export class Home {
  lectures: Lecture[];
  nextLectures: Lecture[];

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /**
   * Fetches a list of lectures using the lecture provider and stores the returned data in the lectures array. Then,
   * the current date is found and all the lectures in the array are iterated over comparing the duration between
   * the lecture date and current date. A custom time class has been used to avoid the excess bloat in the default
   * date class. If the calculated duration is less than the current duration then the calculated duration is
   * stored in the current duration variable and the lecture stored in the next lectures array is updated. An array
   * has been used due to inconsistencies between the page loading and the execution of the returned promise.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {LectureProvider} lectureProvider contains CRUD methods to access lecture related data
   */
  constructor(public navCtrl: NavController, public lectureProvider: LectureProvider) {
    this.lectureProvider.findAll().then((values) => {
      this.lectures = <Array<Lecture>> values;

      let currentDate = new Date(), currentDuration = null;

      for (let i = 0; i < this.lectures.length; i++) {
        let startTime = JSON.parse(JSON.stringify(this.lectures[i].startTime));
        startTime = new Time(startTime._hours + ":" + startTime._minutes);

        let lectureDate = Home.getNextDayOfWeek(currentDate, this.lectures[i].day);
        lectureDate.setHours(startTime.hours);
        lectureDate.setMinutes(startTime.minutes);
        lectureDate.setSeconds(0);

        if (currentDuration == null || (currentDuration < 0 && (currentDuration > (lectureDate.getTime() - currentDate.getTime()) || (lectureDate.getTime() - currentDate.getTime() > 0))) || (currentDuration > (lectureDate.getTime() - currentDate.getTime()) && (lectureDate.getTime() - currentDate.getTime()) > 0)) {
          this.nextLectures = [this.lectures[i]];

          currentDuration = lectureDate.getTime() - currentDate.getTime();
        }
      }
    });
  }

  /**
   * Gets the next occurring day of week, given a specific date. Adapted from Alba, P. G. (2013).
   *
   * @param {Date} date the current date
   * @param {Number} dayOfWeek the day of week of the lecture
   * @returns {Date} the date of the next instance of the lecture
   * @see <a href="http://codereview.stackexchange.com/questions/33527/find-next-occurring-friday-or-any-dayofweek">Find Next Occurring Day Of Week</a>
   */
  static getNextDayOfWeek(date: Date, dayOfWeek: Number): Date {
    let result = new Date(date.getTime());

    result.setDate(date.getDate() + (7 + dayOfWeek.valueOf() - date.getDay()) % 7);

    return result;
  }

  /**
   * Loads the map page, passing in the origin as the user's current location and the destination as the latitude and
   * longitude of the building where the selected lecture is held.
   *
   * @param {Lecture} lecture the selected lecture to display directions on the map page to
   */
  onClickDirections(lecture: Lecture) {
    navigator.geolocation.getCurrentPosition((position) => {
      let building = JSON.parse(JSON.stringify(lecture.building));

      this.navCtrl.setRoot(Map, {
        origin: {lat: position.coords.latitude, lng: position.coords.longitude},
        destination: {lat: building._lat, lng: building._lng}
      });
    });
  }
}
