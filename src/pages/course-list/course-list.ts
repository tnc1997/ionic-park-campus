import {Component }from '@angular/core';
import {NavController} from 'ionic-angular';
import {CourseDetail} from '../course-detail/course-detail';
import {Course} from '../../models/course';
import {CourseProvider} from '../../providers/providers';

@Component({
  selector: 'page-course-list',
  templateUrl: 'course-list.html'
})
export class CourseList {
  courses: Course[] = [];

  constructor(public navCtrl: NavController, public courseProvider: CourseProvider) {
    courseProvider.queryCourses().then((values) => {
      this.courses = <Array<Course>> values;
    });
  }

  onClickCourse(course) {
    this.navCtrl.push(CourseDetail, {
      course: course
    });
  }
}