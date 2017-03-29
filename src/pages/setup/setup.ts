import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuController, NavController, Slides} from 'ionic-angular';
import {Home} from '../home/home';
import {BuildingProvider, LectureProvider, ModuleProvider} from '../../providers/providers';
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

  buildings: Building[];
  modules: Module[];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public formBuilder: FormBuilder, public buildingProvider: BuildingProvider, public lectureProvider: LectureProvider, public moduleProvider: ModuleProvider) {
    this.menuCtrl.enable(false);

    this.buildings = buildingProvider.findAll();
    this.modules = moduleProvider.findAll();

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
    this.lectureProvider.createLecture(new Lecture(this.createLecture.value.module, this.createLecture.value.lecturer, this.createLecture.value.building, this.createLecture.value.room, this.createLecture.value.startTime, this.createLecture.value.finishTime));

    this.createLecture.reset();
  }

  onCreateModule() {
    this.moduleProvider.createModule(new Module(this.createModule.value.code, this.createModule.value.name));

    this.createModule.reset();
  }

  onSlideChanged() {
    if (this.slides.getActiveIndex() == 2) {
      this.modules = this.moduleProvider.findAll();
    }
  }
}
