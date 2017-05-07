import {Component }from '@angular/core';
import {NavController} from 'ionic-angular';
import {CourseDetail} from '../course-detail/course-detail';
import {Map} from '../map/map';
import {Course} from '../../models/course';
import {CourseProvider} from '../../providers/providers';

@Component({
  selector: 'page-course-list',
  templateUrl: 'course-list.html'
})

/**
 * The course list page contains a list of all the courses available at the School of Computing & Technology.
 */
export class CourseList {
  courses: Course[] = [];

  /**
   * Fetches a list of courses from the REST API and uses the returned promise to store them in the courses array.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {CourseProvider} courseProvider contains CRUD methods to access course related data
   */
  constructor(public navCtrl: NavController, public courseProvider: CourseProvider) {
    courseProvider.queryCourses().then((values) => {
      this.courses = <Array<Course>> values;
    });
  }

  /**
   * Pushes the course detail page onto the navigation stack, passing in the selected course.
   *
   * @param {Course} course the course that the user has chosen from the list
   */
  onClickCourse(course: Course) {
    this.navCtrl.push(CourseDetail, {
      course: course
    });
  }

  /**
   * Changes the view to the map page, passing in the building that is home to the selected course.
   *
   * @param {Course} course the course that the user has chosen from the list
   */
  onClickLocation(course: Course) {
    this.navCtrl.setRoot(Map, {
      building: course.building
    });
  }
}
