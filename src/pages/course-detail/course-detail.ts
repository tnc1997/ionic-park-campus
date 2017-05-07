import {Component }from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Course} from '../../models/course';

@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html'
})

/**
 * The course detail page contains specific information about the course selected from the course list page.
 */
export class CourseDetail {
  course: Course;

  /**
   * Fetches the course to be displayed from the navigation parameters.
   *
   * @param {NavController} navCtrl controls the navigation between pages in the application
   * @param {NavParams} navParams stores the parameters passed between pages during navigation
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.course = navParams.get("course");
  }
}
