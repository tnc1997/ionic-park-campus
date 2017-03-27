import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuController, NavController, Slides} from 'ionic-angular';
import {Home} from '../home/home';
import {Buildings, Lectures, Modules} from '../../providers/providers';
import {Building} from '../../models/building';
import {Lecture} from '../../models/lecture';
import {Module} from '../../models/module';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class Setup {
  @ViewChild(Slides) slides: Slides;

  createModule: FormGroup;
  createLecture: FormGroup;

  currentBuildings: Building[];
  currentModules: Module[];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public formBuilder: FormBuilder, public buildings: Buildings, public lectures: Lectures, public modules: Modules) {
    this.menuCtrl.enable(false);

    this.currentBuildings = buildings.findAll();
    this.currentModules = modules.findAll();

    this.createLecture = formBuilder.group({
      module: ["", Validators.required],
      lecturer: ["", Validators.required],
      building: ["", Validators.required],
      room: ["", Validators.required],
      startTime: ["", Validators.required],
      finishTime: ["", Validators.required]
    });
    this.createModule = formBuilder.group({
      code: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  goToNext() {
    this.slides.slideTo(1);
  }

  goToHome() {
    this.menuCtrl.enable(true);

    this.navCtrl.setRoot(Home);
  }

  onCreateLecture() {
    this.lectures.create(new Lecture(this.createLecture.value.module, this.createLecture.value.lecturer, this.createLecture.value.building, this.createLecture.value.room, this.createLecture.value.startTime, this.createLecture.value.finishTime));

    this.createLecture.reset();
  }

  onCreateModule() {
    this.modules.create(new Module(this.createModule.value.code, this.createModule.value.name));

    this.createModule.reset();
  }

  onSlideChanged() {
    if (this.slides.getActiveIndex() == 2) {
      this.currentModules = this.modules.findAll();
    }
  }
}
