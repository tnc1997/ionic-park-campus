import {Component }from '@angular/core';
import {NavController} from 'ionic-angular';
import {Course} from '../../models/course';
import {BuildingProvider, CourseProvider} from '../../providers/providers';

@Component({
  selector: 'page-course-list',
  templateUrl: 'course-list.html'
})
export class CourseList {
  courses: Course[] = [];

  constructor(public navCtrl: NavController, public buildingProvider: BuildingProvider, public courseProvider: CourseProvider) {
    this.courseProvider.queryCourses().subscribe((values) => {
      for (let i = 0; i < values.length; i++) {
        this.courses.push(new Course(values[i].course_id, values[i].course_name, values[i].course_synopsis, values[i].course_description, buildingProvider.findByCode("ww")));
      }
    });
  }
}
