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

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  constructor(public navCtrl: NavController, public lectureProvider: LectureProvider) {
    this.lectureProvider.findAll().then((values) => {
      this.lectures = <Array<Lecture>> values;
    });
  }
}
