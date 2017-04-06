import {Component }from '@angular/core';
import {NavController} from 'ionic-angular';
import {Lecture} from '../../models/lecture';
import {LectureProvider} from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  lectures: Lecture[];
  nextLectures: Lecture[];

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  constructor(public navCtrl: NavController, public lectureProvider: LectureProvider) {
    this.lectureProvider.findAll().then((values) => {
      this.lectures = <Array<Lecture>> values;

      let currentDay, currentDuration, currentTime = new Date().getTime(), optimalDuration = 7;

      if (new Date().getDay() == 0) {
        currentDay = 6;
      } else {
        currentDay = new Date().getDay() - 1;
      }

      for (let i = 0; i < this.lectures.length; i++) {
        if (this.lectures[i].day.valueOf() - currentDay < 0) {
          currentDuration = 7 + (this.lectures[i].day.valueOf() - currentDay);
        } else {
          currentDuration = this.lectures[i].day.valueOf() - currentDay;
        }

        if (currentDuration < optimalDuration) {
          this.nextLectures = [this.lectures[i]];
        }
      }
    });
  }
}
