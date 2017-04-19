import {Component }from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Course} from '../../models/course';

@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html'
})
export class CourseDetail {
  course: Course;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.course = navParams.get("course");
  }
}
